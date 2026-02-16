import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">VetTrainer</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              基於 BSAVA 臨床程序指南的獸醫住院醫師訓練系統，幫助您系統化學習臨床程序。
            </p>
          </div>

          {/* 快速連結 */}
          <div>
            <h3 className="font-medium text-sm text-gray-900 mb-3">快速連結</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/procedures" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  程序資料庫
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  訓練計劃
                </Link>
              </li>
            </ul>
          </div>

          {/* 資訊 */}
          <div>
            <h3 className="font-medium text-sm text-gray-900 mb-3">關於</h3>
            <p className="text-sm text-gray-500">
              程序資料取自 BSAVA Manual of Canine and Feline Clinical Procedures，
              如有疑問請以原始教材為準。
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} VetTrainer. 本系統為教學輔助用途。
          </p>
        </div>
      </div>
    </footer>
  );
}
