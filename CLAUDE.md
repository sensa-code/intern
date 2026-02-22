# CLAUDE.md — VetTrainer 獸醫住院醫師訓練系統

> 本檔案為 Claude Code 的專案級行為準則。所有開發、除錯、部署操作必須遵守。

---

## 專案概述

**VetTrainer** 是基於 BSAVA 臨床程序指南的獸醫住院醫師訓練系統。

| 項目 | 內容 |
|------|------|
| 技術棧 | Next.js 16.1 + React 19 + TypeScript strict + Tailwind CSS v4 |
| 資料庫 | Supabase PostgreSQL (`iizotzzzfhqswjmcotil.supabase.co`) |
| 部署 | Vercel (`vet-residency-trainer.vercel.app`) |
| 富文本 | TipTap/ProseMirror JSON (JSONB), server-side `renderJsonToHtml()` |
| 認證 | Supabase Auth + `vt_user_roles` (super_admin / editor / viewer) |
| 雙語 | 繁體中文(主) + English，所有內容 `*_zh` + `*` 欄位 |

---

## 資料量

- **343** 臨床程序 (`vt_procedures`)
- **16** 知識模組 (`vt_modules`)，涵蓋 7 種類型
- **12+1** 專科分類 (`DEPARTMENTS`)

---

## 技術架構

### 資料庫表

| 表名 | 用途 | RLS |
|------|------|-----|
| `vt_procedures` | 343 個臨床程序（EN + 中文欄位） | ✅ 公開讀取 |
| `vt_modules` | 16 個知識模組（TipTap JSON 內容） | ✅ 公開讀 verified |
| `vt_user_roles` | 管理員角色（super_admin, editor, viewer） | ✅ 自讀 + admin 全權 |

### 前端路由

| 路由 | 用途 | 認證 |
|------|------|------|
| `/` | 首頁 Hero + 統計 + CTA | 公開 |
| `/procedures` | 343 程序列表 + 搜尋 + 科別篩選 | 公開 |
| `/procedures/[id]` | 程序詳情（8 區塊 + EN/中切換） | 公開 |
| `/modules` | 16 模組分組列表（7 類型） | 公開 |
| `/modules/[slug]` | 模組富文本內容 | 公開 |
| `/training` | 學習進度追蹤（localStorage） | 公開 |
| `/login` | Email/密碼登入 | 公開 |
| `/admin` | 管理儀表板 | 需 editor+ |
| `/admin/procedures` | 程序 CRUD 列表 | 需 editor+ |
| `/admin/procedures/[id]/edit` | 程序編輯器 | 需 editor+ |
| `/admin/procedures/new` | 新建程序 | 需 editor+ |
| `/admin/modules` | 模組 CRUD 列表 | 需 editor+ |
| `/admin/modules/[id]/edit` | 模組 TipTap 富文本編輯器 | 需 editor+ |
| `/admin/modules/new` | 新建模組 | 需 editor+ |

### API 路由

| 端點 | 方法 | 用途 | 認證 |
|------|------|------|------|
| `/api/procedures` | GET | 公開程序列表 + 搜尋/篩選 | 無 |
| `/api/procedures/[id]` | GET | 單一程序詳情 | 無 |
| `/api/modules` | GET | 已發布模組列表 | 無 |
| `/api/auth/role` | GET | 查詢當前用戶角色 | Supabase Auth |
| `/api/admin/stats` | GET | 管理統計數據 | editor+ |
| `/api/admin/procedures` | GET/POST | 管理程序列表/新建 | editor+ |
| `/api/admin/procedures/[id]` | GET/PUT/DELETE | 管理單一程序 | editor+ (DELETE: super_admin) |
| `/api/admin/modules` | GET/POST | 管理模組列表/新建 | editor+ |
| `/api/admin/modules/[id]` | GET/PUT/DELETE | 管理單一模組 | editor+ (DELETE: super_admin) |
| `/api/admin/upload` | POST | 圖片上傳 | editor+ |

---

## 安全機制

### 已實施的安全措施

| 機制 | 實作位置 | 說明 |
|------|----------|------|
| CSRF 保護 | `middleware.ts` | Origin/Host 比對，所有 admin mutation |
| XSS 防護 | `modules/[slug]/page.tsx` | `escapeHtml()` + 嚴格 heading level 驗證 |
| Mass Assignment 防護 | admin API PUT handlers | 欄位白名單 (`allowedFields`) |
| UUID 驗證 | `lib/auth/verify-admin.ts` | `isValidUUID()` 防止 SQL injection |
| 角色分離 | admin API DELETE handlers | `super_admin` 才能刪除 |
| Security Headers | `middleware.ts` | CSP, HSTS, X-Frame-Options, Permissions-Policy |
| 錯誤訊息遮蔽 | 所有 API routes | 不洩漏 `error.message` 到前端 |
| 認證中間件 | `middleware.ts` | admin 路由需 editor/super_admin 角色 |

### 工具集 — `lib/auth/verify-admin.ts`

```typescript
verifyAdmin(request)    // 驗證 admin 身份，回傳 { user, supabase, role }
isValidUUID(id)         // 驗證 UUID 格式
checkCSRF(request)      // Origin/Host 比對
sanitizeString(str)     // 清理字串輸入
```

---

## 模組系統

### 7 種模組類型

| 類型 ID | 中文 | 數量 |
|---------|------|------|
| `drug_reference` | 藥物參考 | 3 |
| `lab_reference` | 檢驗參考值 | 3 |
| `emergency_protocol` | 急診流程 | 4 |
| `differential_diagnosis` | 鑑別診斷 | 3 |
| `surgical_technique` | 手術技巧 | 1 |
| `case_study` | 臨床案例 | 1 |
| `anatomy_atlas` | 解剖圖譜 | 1 |

### 16 個已部署模組

1. 小動物急診常用藥物劑量表
2. 犬貓麻醉前給藥方案
3. 圍手術期止痛藥物指引
4. 犬貓血液檢驗正常參考值
5. 尿液分析判讀指南
6. 凝血功能檢驗參考值
7. 小動物心肺復甦術（RECOVER 指引）
8. 胃擴張扭轉（GDV）急診處置流程
9. 過敏性休克急診處置流程
10. 癲癇重積狀態處置流程
11. 鑑別診斷：犬急性嘔吐
12. 鑑別診斷：多尿多渴
13. 鑑別診斷：犬急性腹症
14. 傷口閉合技術概論
15. 臨床案例：糖尿病酮酸中毒
16. 犬腹腔手術解剖圖譜

---

## 12+1 專科分類

| ID | 中文 | 代表 tags |
|----|------|----------|
| `emergency` | 急診與重症 | emergency, critical-care, triage |
| `soft-tissue-surgery` | 軟組織外科 | surgical, soft-tissue |
| `orthopaedic` | 骨科 | orthopaedic, fracture |
| `internal-medicine` | 內科 | internal-medicine, endocrine |
| `anesthesia` | 麻醉與疼痛 | anaesthesia, pain |
| `diagnostic-imaging` | 影像診斷 | imaging, radiograph |
| `cardiopulmonary` | 心肺科 | cardiac, respiratory |
| `neuro-behavior` | 神經與行為 | neurological, behaviour |
| `ophthalmology` | 眼科 | ophthalmology |
| `dermatology` | 皮膚科 | dermatological |
| `pathology-lab` | 病理與檢驗 | laboratory, cytology |
| `other` | 其他專科 | nursing, oral, reproduction |
| `general` | 一般 (fallback) | — |

---

## 開發指南

### 環境設定

```bash
npm install
cp .env.local.example .env.local
# 填入 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY
# 填入 SUPABASE_SERVICE_ROLE_KEY (admin API 用)
npm run dev
```

### Build 與部署

```bash
rm -rf .next && npm run build   # 必須零錯誤
git push origin master          # Vercel 自動部署
```

### Seed 模組資料

```bash
# 需要 SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY 環境變數
npx tsx scripts/seed-modules.ts                  # 5 個基礎模組
npx tsx scripts/seed-modules-expansion-part1.ts  # 5 個擴充模組
npx tsx scripts/seed-modules-expansion-part2.ts  # 6 個擴充模組
```

### 關鍵檔案

| 檔案 | 角色 |
|------|------|
| `middleware.ts` | CSRF + 路由保護 + Security Headers |
| `lib/auth/verify-admin.ts` | 安全工具集 |
| `lib/supabase/server.ts` | Supabase server client |
| `lib/supabase/middleware.ts` | Supabase session middleware |
| `lib/constants/departments.ts` | 12+1 科別定義 |
| `lib/constants/modules.ts` | 7 模組類型定義 |
| `components/editor/` | TipTap 富文本編輯器 |
| `app/modules/[slug]/page.tsx` | 模組 SSR 渲染 + `escapeHtml()` |
| `supabase/011_modules_system.sql` | vt_modules schema + RLS |

---

## 品質檢查結果

### Phase C 專家審查評分 (55 項 × 10 分制)

| 類別 | 項目數 | 平均分 | 修復後平均 |
|------|--------|--------|-----------|
| 安全 (SEC) | 10 | 9.1 | 9.5+ |
| QA | 10 | 8.7 | 9.0+ |
| UI/UX | 10 | 8.6 | 9.0+ |
| 使用者 (USR) | 5 | 8.8 | 9.0+ |
| 獸醫 (VET) | 5 | 9.0 | 9.0 |
| 工程 (ENG) | 5 | 6.8 | 8.0+ |
| PM | 5 | 6.2 | 8.0+ |

### Phase D MCP 巡航結果 (13 項)

| # | 項目 | 分數 | 備註 |
|---|------|------|------|
| 1 | `/` 首頁 | 10 | Hero + 統計 + CTA 完整 |
| 2 | `/procedures` | 10 | 343 筆 + 搜尋 + 12 科別篩選 |
| 3 | `/procedures/{id}` | 10 | 8 區塊 + EN/中切換 + 麵包屑 |
| 4 | `/modules` | 10 | 16 模組 × 7 類型分組 |
| 5 | `/modules/{slug}` | 10 | 富文本 + XSS 安全 |
| 6 | `/training` | 10 | 進度追蹤 + 三態統計 |
| 7 | `/login` | 10 | Email/密碼表單 + 返回首頁 |
| 8 | `/admin` | 10 | 正確重導到 login |
| 9 | `/admin/procedures` | 9 | 需登入驗證 (無法測試 CRUD) |
| 10 | `/admin/modules` | 9 | 需登入驗證 (無法測試 CRUD) |
| 11 | 搜尋→詳情→返回 | 10 | 無 404，流程完整 |
| 12 | 模組瀏覽流程 | 10 | DKA 案例完整渲染 |
| 13 | 響應式 1280px | 10 | 3欄 grid + 篩選列正常 |

---

## 已知限制

1. **Admin 管理頁面未視覺測試** — 需要 Supabase Auth 帳號才能存取 `/admin/*`
2. **ENG-2: 5 個檔案超過 300 行** — `seed-modules-expansion-part1.ts`、`part2.ts`、`procedures/page.tsx`、`modules/[slug]/page.tsx`、`procedures/[id]/page.tsx` 需拆分
3. **ENG-3: DRY 違規** — TipTap JSON helpers 在 3 個 seed 檔案重複定義，應抽為共用模組
4. **UX-7: 無表單驗證庫** — Admin 表單使用手動驗證，建議整合 Zod
5. **Training 頁面硬編碼 343** — 應從 API 動態取得程序總數
6. **vt_checklist_templates RLS** — 已建立 migration `012_checklist_rls.sql`，需在 Supabase Dashboard 執行

---

## Git 歷史

```
1532300 docs: add project-level CLAUDE.md
5998c89 fix: Phase C Round 1 — expert review fixes (security, UX, engineering)
4101cb0 feat: Phase B — 10 new bilingual veterinary knowledge modules
7899ae8 fix: round 2 security — XSS escape, stats auth, allowlist PUT, super_admin delete, race-safe ID
```

---

## 更新紀錄

| 日期 | 變更 | Commit |
|------|------|--------|
| 2026-02-22 | Phase B: 10 新模組 + seed 16 模組到 Supabase | 4101cb0 |
| 2026-02-22 | Phase C: 專家審查修復 11 檔 | 5998c89 |
| 2026-02-22 | Phase D: MCP 巡航 13 項全通過 | — |
| 2026-02-22 | Phase E: 建立本文件 | 1532300 |
| 2026-02-22 | Phase C Round 2: checklist RLS + Procedure 型別修復 | — |
