'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ClipboardList, Package, Image as ImageIcon,
  Users, LogOut, Stethoscope, Loader2, ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createBrowserClient } from '@/lib/supabase/client';
import type { UserRole } from '@/lib/auth/roles';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: '儀表板', icon: <LayoutDashboard className="h-4 w-4" />, roles: ['super_admin', 'editor'] },
  { href: '/admin/procedures', label: '程序管理', icon: <ClipboardList className="h-4 w-4" />, roles: ['super_admin', 'editor'] },
  { href: '/admin/modules', label: '模組管理', icon: <Package className="h-4 w-4" />, roles: ['super_admin', 'editor'] },
  { href: '/admin/images', label: '圖片庫', icon: <ImageIcon className="h-4 w-4" />, roles: ['super_admin', 'editor'] },
  { href: '/admin/users', label: '用戶管理', icon: <Users className="h-4 w-4" />, roles: ['super_admin'] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/role');
        if (!res.ok) {
          router.push('/login?redirect=' + pathname);
          return;
        }
        const data = await res.json();
        if (!data.role || data.role === 'viewer') {
          router.push('/?error=unauthorized');
          return;
        }
        setUserRole(data.role);
        setDisplayName(data.display_name || data.email || '');
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, router]);

  async function handleLogout() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const filteredNav = NAV_ITEMS.filter(item =>
    userRole && item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 側邊欄 */}
      <aside className="w-60 bg-white border-r flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-4 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-sm">VetTrainer 管理後台</span>
          </Link>
        </div>

        {/* 導航 */}
        <nav className="flex-1 p-3 space-y-1">
          {filteredNav.map(item => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 用戶資訊 + 登出 */}
        <div className="p-3 border-t space-y-2">
          <div className="px-3 py-1">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <p className="text-xs text-muted-foreground">
              {userRole === 'super_admin' ? '超級管理員' : '內容編輯'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start text-xs"
              onClick={() => router.push('/')}
            >
              <ChevronLeft className="h-3 w-3 mr-1" />
              返回前台
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </aside>

      {/* 主內容區 */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
