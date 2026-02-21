'use client';

import React from 'react';

/**
 * Auth 佈局 — 登入頁使用，不含 Navbar/Footer
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}
