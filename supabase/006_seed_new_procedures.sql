-- 006: 281 筆新增臨床程序（proc_063 ~ proc_343）

-- A. Emergency & Critical Care (30)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_063', 'GDV emergency stabilization', '胃擴張扭轉急救穩定處置', 'G', 0, ARRAY['emergency', 'surgery', 'gastric'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_064', 'Status epilepticus emergency management', '癲癇重積急救處置', 'S', 0, ARRAY['emergency', 'neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_065', 'Shock fluid resuscitation protocols', '休克輸液復甦方案', 'S', 0, ARRAY['emergency', 'fluid-therapy'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_066', 'Emergency drug calculations and CRI setup', '急診藥物劑量計算與 CRI 設定', 'E', 0, ARRAY['emergency', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_067', 'Wound management and bandaging', '傷口管理與繃帶技術', 'W', 0, ARRAY['emergency', 'wound-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_068', 'Robert Jones bandage application', 'Robert Jones 繃帶', 'R', 0, ARRAY['emergency', 'orthopedics', 'bandage'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_069', 'Tie-over bandage technique', '捆綁式繃帶（Tie-over bandage）', 'T', 0, ARRAY['emergency', 'wound-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_070', 'Wet-to-dry wound dressing', '濕式傷口敷料', 'W', 0, ARRAY['emergency', 'wound-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_071', 'Negative pressure wound therapy (VAC)', '負壓傷口治療（VAC）', 'N', 0, ARRAY['emergency', 'wound-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_072', 'Central venous catheter placement', '中心靜脈導管放置', 'C', 0, ARRAY['emergency', 'vascular-access'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_073', 'Central venous pressure measurement', '中心靜脈壓測量', 'C', 0, ARRAY['emergency', 'monitoring'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_074', 'Arterial catheter placement and blood gas analysis', '動脈導管放置與血氣分析', 'A', 0, ARRAY['emergency', 'monitoring'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_075', 'Pulse oximetry monitoring', '脈搏血氧飽和度監測', 'P', 0, ARRAY['emergency', 'monitoring'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_076', 'End-tidal CO2 capnography', '呼氣末二氧化碳監測', 'E', 0, ARRAY['emergency', 'monitoring'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_077', 'Oxygen cage therapy', '氧氣籠使用與氧療', 'O', 0, ARRAY['emergency', 'respiratory'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_078', 'Temporary cardiac pacemaker placement', '臨時心臟節律器放置', 'T', 0, ARRAY['emergency', 'cardiology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_079', 'Electrical defibrillation', '電擊去顫術', 'E', 0, ARRAY['emergency', 'cardiology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_080', 'Autotransfusion technique', '自體血液回收輸血', 'A', 0, ARRAY['emergency', 'transfusion'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_081', 'Abdominal drain placement', '腹腔引流管放置', 'A', 0, ARRAY['emergency', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_082', 'Emergency exploratory laparotomy', '急診剖腹探查術', 'E', 0, ARRAY['emergency', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_083', 'Primary trauma survey (ABCDE)', '創傷初級評估（ABCDE）', 'P', 0, ARRAY['emergency', 'triage'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_084', 'Secondary trauma survey', '創傷二級評估', 'S', 0, ARRAY['emergency', 'triage'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_085', 'Focused assessment with sonography (AFAST/TFAST/Vet BLUE)', 'FAST 超音波（AFAST/TFAST/Vet BLUE）', 'F', 0, ARRAY['emergency', 'ultrasound'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_086', 'Acute kidney injury management', '急性腎損傷處置', 'A', 0, ARRAY['emergency', 'nephrology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_087', 'Toxicological emergency management', '中毒急救處置', 'T', 0, ARRAY['emergency', 'toxicology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_088', 'Emesis induction', '催吐術', 'E', 0, ARRAY['emergency', 'toxicology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_089', 'Activated charcoal administration', '活性碳投予', 'A', 0, ARRAY['emergency', 'toxicology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_090', 'Heatstroke emergency management', '熱中暑急救處置', 'H', 0, ARRAY['emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_091', 'Hypothermia management', '低體溫症處置', 'H', 0, ARRAY['emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_092', 'Drowning/submersion emergency management', '溺水急救處置', 'D', 0, ARRAY['emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

-- B. Anesthesia & Pain Management (25)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_093', 'Pre-anesthetic assessment and ASA classification', '術前麻醉評估與 ASA 分級', 'P', 0, ARRAY['anesthesia'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_094', 'General anesthesia induction – intravenous', '全身麻醉誘導（靜脈）', 'G', 0, ARRAY['anesthesia'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_095', 'General anesthesia maintenance – inhalation', '全身麻醉維持（吸入性）', 'G', 0, ARRAY['anesthesia'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_096', 'General anesthesia monitoring', '全身麻醉監測', 'G', 0, ARRAY['anesthesia', 'monitoring'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_097', 'Anesthesia recovery management', '麻醉甦醒期管理', 'A', 0, ARRAY['anesthesia'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_098', 'Epidural anesthesia and analgesia', '硬膜外麻醉與鎮痛', 'E', 0, ARRAY['anesthesia', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_099', 'Local infiltration anesthesia', '局部浸潤麻醉', 'L', 0, ARRAY['anesthesia', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_100', 'Infraorbital nerve block', '眶下神經阻斷', 'I', 0, ARRAY['anesthesia', 'dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_101', 'Inferior alveolar nerve block', '下顎齒槽神經阻斷', 'I', 0, ARRAY['anesthesia', 'dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_102', 'Brachial plexus nerve block', '腋叢神經阻斷', 'B', 0, ARRAY['anesthesia', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_103', 'Femoral and sciatic nerve block', '股神經及坐骨神經阻斷', 'F', 0, ARRAY['anesthesia', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_104', 'Intercostal nerve block', '肋間神經阻斷', 'I', 0, ARRAY['anesthesia', 'thoracic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_105', 'Maxillary nerve block (RUMM)', 'RUMM 阻斷（上顎神經）', 'M', 0, ARRAY['anesthesia', 'dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_106', 'Constant rate infusion analgesia', '恆速輸注鎮痛（CRI analgesia）', 'C', 0, ARRAY['anesthesia', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_107', 'Multimodal pain management protocol', '多模式疼痛管理方案', 'M', 0, ARRAY['anesthesia', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_108', 'Sedation protocols – dog', '鎮靜方案（犬）', 'S', 0, ARRAY['anesthesia', 'sedation'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_109', 'Sedation protocols – cat', '鎮靜方案（貓）', 'S', 0, ARRAY['anesthesia', 'sedation'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_110', 'Neuromuscular blocking agent administration', '神經肌肉阻斷劑使用', 'N', 0, ARRAY['anesthesia'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_111', 'Mechanical ventilation setup and management', '機械通氣設定與管理', 'M', 0, ARRAY['anesthesia', 'critical-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_112', 'Transtracheal jet ventilation', '經皮氣管穿刺噴射通氣', 'T', 0, ARRAY['anesthesia', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_113', 'Transversus abdominis plane (TAP) block', '腹橫肌平面阻斷（TAP block）', 'T', 0, ARRAY['anesthesia', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_114', 'Intra-articular analgesia', '關節內鎮痛', 'I', 0, ARRAY['anesthesia', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_115', 'Incisional line block', '切口線浸潤鎮痛', 'I', 0, ARRAY['anesthesia', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_116', 'NSAID administration protocols', '非類固醇消炎止痛藥使用規範', 'N', 0, ARRAY['anesthesia', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_117', 'Opioid administration and monitoring', '類鴉片藥物使用規範', 'O', 0, ARRAY['anesthesia', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

-- C. Soft Tissue Surgery (40)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_118', 'Suture techniques and wound closure', '縫合技術與傷口關閉', 'S', 0, ARRAY['surgery', 'basic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_119', 'Cutaneous mass excision', '皮膚腫塊切除術', 'C', 0, ARRAY['surgery', 'oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_120', 'Ovariohysterectomy – dog', '卵巢子宮切除術（犬）', 'O', 0, ARRAY['surgery', 'reproductive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_121', 'Ovariohysterectomy – cat', '卵巢子宮切除術（貓）', 'O', 0, ARRAY['surgery', 'reproductive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_122', 'Castration – dog', '去勢術（犬）', 'C', 0, ARRAY['surgery', 'reproductive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_123', 'Castration – cat', '去勢術（貓）', 'C', 0, ARRAY['surgery', 'reproductive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_124', 'Exploratory laparotomy', '剖腹探查術', 'E', 0, ARRAY['surgery', 'abdominal'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_125', 'Gastrotomy', '胃切開術', 'G', 0, ARRAY['surgery', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_126', 'Enterotomy', '腸切開術', 'E', 0, ARRAY['surgery', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_127', 'Intestinal resection and anastomosis', '腸切除吻合術', 'I', 0, ARRAY['surgery', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_128', 'Gastropexy', '胃固定術', 'G', 0, ARRAY['surgery', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_129', 'Cystotomy', '膀胱切開術', 'C', 0, ARRAY['surgery', 'urinary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_130', 'Splenectomy', '脾臟切除術', 'S', 0, ARRAY['surgery', 'abdominal'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_131', 'Liver lobectomy', '肝葉切除術', 'L', 0, ARRAY['surgery', 'hepatic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_132', 'Cholecystectomy', '膽囊切除術', 'C', 0, ARRAY['surgery', 'hepatobiliary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_133', 'Pyometra surgery', '子宮蓄膿症手術', 'P', 0, ARRAY['surgery', 'reproductive', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_134', 'Cryptorchidectomy', '隱睪摘除術', 'C', 0, ARRAY['surgery', 'reproductive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_135', 'Perineal herniorrhaphy', '會陰疝氣修補術', 'P', 0, ARRAY['surgery', 'perineal'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_136', 'Abdominal hernia repair', '腹壁疝氣修補術', 'A', 0, ARRAY['surgery', 'abdominal'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_137', 'Umbilical hernia repair', '臍疝氣修補術', 'U', 0, ARRAY['surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_138', 'Inguinal hernia repair', '腹股溝疝氣修補術', 'I', 0, ARRAY['surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_139', 'Diaphragmatic hernia repair', '橫膈疝氣修補術', 'D', 0, ARRAY['surgery', 'thoracic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_140', 'Anal sacculectomy', '肛門囊切除術', 'A', 0, ARRAY['surgery', 'perineal'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_141', 'Rectal prolapse reduction and colopexy', '直腸脫垂復位與固定', 'R', 0, ARRAY['surgery', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_142', 'Sialocele (salivary mucocele) surgery', '唾液腺腫囊切除術', 'S', 0, ARRAY['surgery', 'head-neck'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_143', 'Thyroidectomy', '甲狀腺切除術', 'T', 0, ARRAY['surgery', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_144', 'Adrenalectomy', '腎上腺切除術', 'A', 0, ARRAY['surgery', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_145', 'Nephrectomy', '腎臟切除術', 'N', 0, ARRAY['surgery', 'urinary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_146', 'Ureterotomy / Ureteroneocystostomy', '輸尿管切開術/輸尿管造新開口術', 'U', 0, ARRAY['surgery', 'urinary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_147', 'Perineal urethrostomy', '尿道造口術（會陰）', 'P', 0, ARRAY['surgery', 'urinary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_148', 'Prepubic urethrostomy', '尿道造口術（恥骨前）', 'P', 0, ARRAY['surgery', 'urinary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_149', 'Skin flap techniques (axial pattern and rotation)', '皮瓣技術（軸型與旋轉型）', 'S', 0, ARRAY['surgery', 'reconstructive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_150', 'Skin grafting techniques', '皮膚移植術', 'S', 0, ARRAY['surgery', 'reconstructive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_151', 'Drain placement (Penrose and active drains)', '引流管放置（Penrose 及主動引流）', 'D', 0, ARRAY['surgery', 'wound-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_152', 'Esophageal foreign body removal – endoscopic', '食道異物移除（內視鏡）', 'E', 0, ARRAY['surgery', 'GI', 'endoscopy'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_153', 'Gastric foreign body removal – endoscopic', '胃內異物移除（內視鏡）', 'G', 0, ARRAY['surgery', 'GI', 'endoscopy'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_154', 'Arytenoid lateralization (laryngeal tie-back)', '喉部麻痺矯正術（Arytenoid lateralization）', 'A', 0, ARRAY['surgery', 'respiratory'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_155', 'Elongated soft palate resection (staphylectomy)', '軟顎過長矯正術', 'E', 0, ARRAY['surgery', 'respiratory'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_156', 'Stenotic nares correction (alarplasty)', '鼻孔狹窄矯正術', 'S', 0, ARRAY['surgery', 'respiratory'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_157', 'Lung lobectomy', '肺葉切除術', 'L', 0, ARRAY['surgery', 'thoracic'])
ON CONFLICT (procedure_id) DO NOTHING;

-- D. Orthopedics (25)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_158', 'External skeletal fixation (ESF) application', '外固定支架放置', 'E', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_159', 'Splinting techniques', '副木固定技術', 'S', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_160', 'Casting techniques', '石膏固定技術', 'C', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_161', 'Intramedullary pin fixation', '骨內髓內釘固定', 'I', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_162', 'Bone plating and screw fixation', '骨板螺釘固定', 'B', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_163', 'Cerclage wire fixation', '環紮鋼絲固定', 'C', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_164', 'Tibial plateau leveling osteotomy (TPLO)', '前十字韌帶斷裂穩定術 — TPLO', 'T', 0, ARRAY['orthopedics', 'stifle'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_165', 'Tibial tuberosity advancement (TTA)', '前十字韌帶斷裂穩定術 — TTA', 'T', 0, ARRAY['orthopedics', 'stifle'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_166', 'Extracapsular lateral suture stabilization', '前十字韌帶斷裂穩定術 — 囊外穩定法', 'E', 0, ARRAY['orthopedics', 'stifle'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_167', 'Patellar luxation correction', '膝蓋骨脫臼矯正術', 'P', 0, ARRAY['orthopedics', 'stifle'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_168', 'Femoral head and neck ostectomy (FHO)', '股骨頭頸切除術（FHO）', 'F', 0, ARRAY['orthopedics', 'hip'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_169', 'Total hip replacement (THR)', '全髖關節置換術（THR）', 'T', 0, ARRAY['orthopedics', 'hip'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_170', 'Elbow dysplasia evaluation', '肘關節發育不良評估', 'E', 0, ARRAY['orthopedics', 'elbow'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_171', 'Ulnar osteotomy', '尺骨切截術', 'U', 0, ARRAY['orthopedics', 'elbow'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_172', 'Fragmented coronoid process removal', '冠狀突碎片移除術', 'F', 0, ARRAY['orthopedics', 'elbow'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_173', 'Arthroscopy', '關節鏡檢查', 'A', 0, ARRAY['orthopedics', 'minimally-invasive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_174', 'Limb amputation', '截肢術', 'L', 0, ARRAY['orthopedics', 'oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_175', 'Mandibular fracture repair', '下顎骨骨折固定', 'M', 0, ARRAY['orthopedics', 'dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_176', 'Bone grafting techniques', '骨移植術', 'B', 0, ARRAY['orthopedics', 'fracture'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_177', 'Tarsal arthrodesis', '跗關節固定術', 'T', 0, ARRAY['orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_178', 'Carpal arthrodesis', '腕關節固定術', 'C', 0, ARRAY['orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_179', 'Hemilaminectomy', '脊椎減壓術（半椎板切除）', 'H', 0, ARRAY['orthopedics', 'neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_180', 'Ventral slot decompression', '腹側頸椎減壓術（Ventral slot）', 'V', 0, ARRAY['orthopedics', 'neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_181', 'Physical rehabilitation assessment', '物理復健基礎評估', 'P', 0, ARRAY['orthopedics', 'rehabilitation'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_182', 'Osteoarthritis conservative management', '骨關節炎保守治療方案', 'O', 0, ARRAY['orthopedics', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

-- E. Diagnostic Imaging (20)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_183', 'Radiographic positioning and interpretation', '放射線攝影定位與判讀', 'R', 0, ARRAY['imaging', 'radiology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_184', 'Systematic abdominal ultrasonography', '腹部超音波系統掃描', 'S', 0, ARRAY['imaging', 'ultrasound'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_185', 'Ultrasound-guided fine needle aspiration', '超音波導引細針抽吸', 'U', 0, ARRAY['imaging', 'ultrasound', 'cytology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_186', 'Ultrasound-guided tissue biopsy', '超音波導引組織切片', 'U', 0, ARRAY['imaging', 'ultrasound'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_187', 'Thoracic ultrasonography', '胸腔超音波檢查', 'T', 0, ARRAY['imaging', 'ultrasound'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_188', 'Ocular ultrasonography', '眼球超音波檢查', 'O', 0, ARRAY['imaging', 'ultrasound', 'ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_189', 'Musculoskeletal ultrasonography', '肌腱與韌帶超音波', 'M', 0, ARRAY['imaging', 'ultrasound', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_190', 'Contrast-enhanced ultrasonography (CEUS)', '對比增強超音波（CEUS）', 'C', 0, ARRAY['imaging', 'ultrasound'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_191', 'Fluoroscopy-guided procedures', '透視引導技術（fluoroscopy）', 'F', 0, ARRAY['imaging'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_192', 'CT scan positioning and interpretation principles', 'CT 掃描定位與判讀原則', 'C', 0, ARRAY['imaging', 'CT'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_193', 'MRI interpretation principles', 'MRI 判讀基礎原則', 'M', 0, ARRAY['imaging', 'MRI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_194', 'Dental radiography', '口腔放射線攝影（牙科 X 光）', 'D', 0, ARRAY['imaging', 'dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_195', 'Myelography', '脊髓造影術', 'M', 0, ARRAY['imaging', 'neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_196', 'Cystography (positive and negative contrast)', '膀胱造影術（正性與負性對比）', 'C', 0, ARRAY['imaging', 'urinary'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_197', 'Esophagography', '食道造影術', 'E', 0, ARRAY['imaging', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_198', 'Arthrography', '關節造影術', 'A', 0, ARRAY['imaging', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_199', 'Fistulography / sinography', '瘻管造影術', 'F', 0, ARRAY['imaging', 'wound-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_200', 'Nuclear scintigraphy – thyroid', '核醫學甲狀腺掃描', 'N', 0, ARRAY['imaging', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_201', 'Portography (portal venography)', '門脈造影術', 'P', 0, ARRAY['imaging', 'hepatic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_202', 'Lymphangiography', '淋巴造影術', 'L', 0, ARRAY['imaging', 'oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

-- F. Internal Medicine (30)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_203', 'Low-dose dexamethasone suppression test (LDDST)', '地塞米松抑制試驗（低劑量）', 'L', 0, ARRAY['internal-medicine', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_204', 'High-dose dexamethasone suppression test (HDDST)', '地塞米松抑制試驗（高劑量）', 'H', 0, ARRAY['internal-medicine', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_205', 'Thyroid function testing (T4/fT4/TSH)', '甲狀腺功能檢查（T4/fT4/TSH）', 'T', 0, ARRAY['internal-medicine', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_206', 'Insulin curve monitoring', '胰島素曲線監測', 'I', 0, ARRAY['internal-medicine', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_207', 'Fructosamine measurement', '果糖胺測定', 'F', 0, ARRAY['internal-medicine', 'endocrine'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_208', 'Bile acid stimulation test', '膽汁酸刺激試驗', 'B', 0, ARRAY['internal-medicine', 'hepatic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_209', 'Percutaneous liver biopsy', '經皮肝臟切片', 'P', 0, ARRAY['internal-medicine', 'hepatic'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_210', 'Percutaneous renal biopsy', '經皮腎臟切片', 'P', 0, ARRAY['internal-medicine', 'nephrology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_211', 'GI absorption tests (TLI/PLI/cobalamin/folate)', '腸道吸收功能試驗（TLI/PLI/cobalamin/folate）', 'G', 0, ARRAY['internal-medicine', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_212', 'Upper GI endoscopy (esophagogastroduodenoscopy)', '上消化道內視鏡檢查', 'U', 0, ARRAY['internal-medicine', 'GI', 'endoscopy'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_213', 'Lower GI endoscopy (colonoscopy)', '下消化道內視鏡檢查（大腸鏡）', 'L', 0, ARRAY['internal-medicine', 'GI', 'endoscopy'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_214', 'Endoscopic mucosal biopsy', '內視鏡黏膜切片', 'E', 0, ARRAY['internal-medicine', 'GI', 'endoscopy'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_215', 'Laparoscopy', '腹腔鏡檢查', 'L', 0, ARRAY['internal-medicine', 'minimally-invasive'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_216', 'Ascitic fluid analysis and classification', '腹水分析與滲漏液分類', 'A', 0, ARRAY['internal-medicine', 'clinical-pathology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_217', 'Pleural fluid analysis and classification', '胸水分析與分類', 'P', 0, ARRAY['internal-medicine', 'clinical-pathology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_218', 'Blood typing and crossmatching', '血型鑑定與交叉配血', 'B', 0, ARRAY['internal-medicine', 'transfusion'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_219', 'Bone marrow biopsy interpretation', '骨髓切片判讀', 'B', 0, ARRAY['internal-medicine', 'hematology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_220', 'IMHA management protocol', '免疫介導性溶血性貧血處置', 'I', 0, ARRAY['internal-medicine', 'hematology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_221', 'ITP management protocol', '免疫介導性血小板減少症處置', 'I', 0, ARRAY['internal-medicine', 'hematology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_222', 'Diabetic ketoacidosis (DKA) management', '糖尿病酮酸血症急性處置', 'D', 0, ARRAY['internal-medicine', 'endocrine', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_223', 'Addisonian crisis emergency management', 'Addison 危象急救', 'A', 0, ARRAY['internal-medicine', 'endocrine', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_224', 'Thyroid storm management – cat', '甲狀腺風暴處置（貓）', 'T', 0, ARRAY['internal-medicine', 'endocrine', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_225', 'Pancreatitis diagnosis and management', '胰臟炎診斷與處置', 'P', 0, ARRAY['internal-medicine', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_226', 'Chronic kidney disease staging and management (IRIS)', '慢性腎病分期與管理（IRIS）', 'C', 0, ARRAY['internal-medicine', 'nephrology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_227', 'Protein-losing enteropathy (PLE) management', '蛋白流失性腸病處置', 'P', 0, ARRAY['internal-medicine', 'GI'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_228', 'Protein-losing nephropathy (PLN) management', '蛋白流失性腎病處置', 'P', 0, ARRAY['internal-medicine', 'nephrology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_229', 'Infectious disease point-of-care testing (SNAP/PCR)', '傳染病快篩判讀（SNAP/PCR）', 'I', 0, ARRAY['internal-medicine', 'infectious'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_230', 'Systemic hypertension management', '全身性高血壓管理', 'S', 0, ARRAY['internal-medicine', 'cardiology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_231', 'Hyperkalemia emergency management', '高血鉀急救處置', 'H', 0, ARRAY['internal-medicine', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_232', 'Hypoglycemia emergency management', '低血糖急救處置', 'H', 0, ARRAY['internal-medicine', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

-- G. Cardiology (10)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_233', 'Cardiac auscultation and murmur grading', '心臟聽診與雜音分級', 'C', 0, ARRAY['cardiology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_234', 'Holter ECG monitoring', 'Holter 心電圖監測', 'H', 0, ARRAY['cardiology', 'monitoring'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_235', 'Cardiac biomarker interpretation (NT-proBNP/cTnI)', '心臟生物標記判讀（NT-proBNP/cTnI）', 'C', 0, ARRAY['cardiology', 'clinical-pathology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_236', 'Congestive heart failure acute management', '充血性心衰竭急性處置', 'C', 0, ARRAY['cardiology', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_237', 'Pericardial effusion drainage', '心包積液引流術', 'P', 0, ARRAY['cardiology', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_238', 'Heartworm disease diagnosis and staging', '心絲蟲症診斷與分期', 'H', 0, ARRAY['cardiology', 'parasitology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_239', 'Heartworm adulticide therapy (melarsomine protocol)', '心絲蟲成蟲殺滅治療', 'H', 0, ARRAY['cardiology', 'parasitology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_240', 'Antiarrhythmic drug therapy', '心律不整藥物治療', 'A', 0, ARRAY['cardiology', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_241', 'Transesophageal echocardiography', '經食道心臟超音波', 'T', 0, ARRAY['cardiology', 'imaging'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_242', 'Electrical cardioversion', '心臟電復律', 'E', 0, ARRAY['cardiology', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

-- H. Dermatology (15)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_243', 'Skin punch biopsy', '皮膚打孔切片', 'S', 0, ARRAY['dermatology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_244', 'Wood''s lamp examination', 'Wood''s 燈檢查', 'W', 0, ARRAY['dermatology', 'mycology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_245', 'Dermatophyte culture (DTM)', '皮黴菌培養（DTM）', 'D', 0, ARRAY['dermatology', 'mycology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_246', 'Ear cytology', '耳道細胞學檢查', 'E', 0, ARRAY['dermatology', 'otology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_247', 'Skin cytology (impression/tape/scraping)', '皮膚細胞學檢查（壓印/膠帶/刮片）', 'S', 0, ARRAY['dermatology', 'cytology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_248', 'Intradermal allergy testing', '皮內過敏原試驗', 'I', 0, ARRAY['dermatology', 'immunology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_249', 'Serum allergen-specific IgE testing', '血清過敏原檢測', 'S', 0, ARRAY['dermatology', 'immunology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_250', 'Flea combing examination', '梳毛檢查（跳蚤梳）', 'F', 0, ARRAY['dermatology', 'parasitology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_251', 'Trichography (hair pluck examination)', '毛髮鏡檢（拔毛試驗）', 'T', 0, ARRAY['dermatology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_252', 'Nail bed biopsy', '趾甲切片', 'N', 0, ARRAY['dermatology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_253', 'Allergen-specific immunotherapy (ASIT)', '減敏治療（免疫治療）', 'A', 0, ARRAY['dermatology', 'immunology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_254', 'Deep ear canal flushing', '耳道深層沖洗', 'D', 0, ARRAY['dermatology', 'otology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_255', 'Total ear canal ablation – lateral bulla osteotomy (TECA-LBO)', '全耳道切除併側壁骨泡切除術（TECA-LBO）', 'T', 0, ARRAY['dermatology', 'surgery', 'otology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_256', 'Lateral ear canal resection (Zepp procedure)', '側壁耳道切除術', 'L', 0, ARRAY['dermatology', 'surgery', 'otology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_257', 'Atopic dermatitis long-term management', '異位性皮膚炎長期管理', 'A', 0, ARRAY['dermatology'])
ON CONFLICT (procedure_id) DO NOTHING;

-- I. Ophthalmology (15)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_258', 'Schirmer tear test', '淚液分泌試驗（Schirmer test）', 'S', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_259', 'Fluorescein corneal staining', '螢光素角膜染色', 'F', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_260', 'Tonometry (intraocular pressure measurement)', '眼壓測量（Tonometry）', 'T', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_261', 'Nasolacrimal duct flushing', '鼻淚管沖洗', 'N', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_262', 'Subconjunctival injection', '結膜下注射', 'S', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_263', 'Corneal foreign body removal', '角膜異物移除', 'C', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_264', 'Corneal ulcer debridement', '角膜潰瘍清創術', 'C', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_265', 'Grid keratotomy for indolent ulcers', '角膜格狀切開術', 'G', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_266', 'Third eyelid gland prolapse repair (cherry eye)', '第三眼瞼腺脫出復位術（Cherry eye repair）', 'T', 0, ARRAY['ophthalmology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_267', 'Eyelid mass excision', '眼瞼腫塊切除術', 'E', 0, ARRAY['ophthalmology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_268', 'Entropion correction', '眼瞼內翻矯正術', 'E', 0, ARRAY['ophthalmology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_269', 'Enucleation', '眼球摘除術', 'E', 0, ARRAY['ophthalmology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_270', 'Temporary tarsorrhaphy', '暫時性瞼縫合', 'T', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_271', 'Fundoscopy (direct and indirect ophthalmoscopy)', '眼底檢查（直接與間接檢眼鏡）', 'F', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_272', 'Anterior chamber paracentesis (aqueocentesis)', '前房穿刺術', 'A', 0, ARRAY['ophthalmology'])
ON CONFLICT (procedure_id) DO NOTHING;

-- J. Oncology (12)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_273', 'Chemotherapy administration and safety protocols', '化學治療給藥與安全規範', 'C', 0, ARRAY['oncology', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_274', 'Incisional biopsy', '切開式切片', 'I', 0, ARRAY['oncology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_275', 'Excisional biopsy', '切除式切片', 'E', 0, ARRAY['oncology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_276', 'Lymph node extirpation and staging', '淋巴結摘除術與分期', 'L', 0, ARRAY['oncology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_277', 'Tumor staging work-up', '腫瘤分期全身評估（staging work-up）', 'T', 0, ARRAY['oncology', 'imaging'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_278', 'Mast cell tumor surgery planning and margin evaluation', '肥大細胞瘤手術計劃與邊界評估', 'M', 0, ARRAY['oncology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_279', 'Mammary tumor excision (mastectomy)', '乳腺腫瘤切除術', 'M', 0, ARRAY['oncology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_280', 'IV chemotherapy drug administration', '靜脈注射化療藥物（doxorubicin, vincristine 等）', 'I', 0, ARRAY['oncology', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_281', 'Oral chemotherapy management', '口服化療藥物管理（cyclophosphamide, chlorambucil 等）', 'O', 0, ARRAY['oncology', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_282', 'Chemotherapy side effect monitoring and management', '化療副作用監測與處置', 'C', 0, ARRAY['oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_283', 'Intracavitary chemotherapy', '體腔灌注化療', 'I', 0, ARRAY['oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_284', 'Oncologic pain management protocols', '腫瘤疼痛管理方案', 'O', 0, ARRAY['oncology', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

-- K. Dentistry (12)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_285', 'Dental examination and charting', '牙科檢查與齒式記錄', 'D', 0, ARRAY['dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_286', 'Periodontal probing', '牙周探針檢查', 'P', 0, ARRAY['dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_287', 'Dental scaling and polishing (prophylaxis)', '牙結石清除與拋光', 'D', 0, ARRAY['dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_288', 'Simple dental extraction (single-rooted tooth)', '簡易拔牙術（單根牙）', 'S', 0, ARRAY['dental'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_289', 'Surgical dental extraction (multi-rooted sectioning)', '手術性拔牙（多根牙分割法）', 'S', 0, ARRAY['dental', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_290', 'Dental radiography and interpretation', '牙科 X 光攝影與判讀', 'D', 0, ARRAY['dental', 'imaging'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_291', 'Periodontal flap surgery', '牙周翻瓣術', 'P', 0, ARRAY['dental', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_292', 'Dental nerve blocks (maxillary/mandibular)', '牙科神經阻斷（上顎/下顎）', 'D', 0, ARRAY['dental', 'anesthesia'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_293', 'Oral mass biopsy', '口腔腫塊切片', 'O', 0, ARRAY['dental', 'oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_294', 'Cleft palate repair', '口顎裂修補術', 'C', 0, ARRAY['dental', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_295', 'Mandibulectomy', '下顎骨切除術', 'M', 0, ARRAY['dental', 'surgery', 'oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_296', 'Maxillectomy', '上顎骨切除術', 'M', 0, ARRAY['dental', 'surgery', 'oncology'])
ON CONFLICT (procedure_id) DO NOTHING;

-- L. Neurology (10)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_297', 'Advanced neurolocalization', '進階神經定位診斷', 'A', 0, ARRAY['neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_298', 'Electromyography (EMG) basics', '肌電圖基礎（EMG）', 'E', 0, ARRAY['neurology', 'diagnostics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_299', 'Electroencephalography (EEG) basics', '腦電圖基礎（EEG）', 'E', 0, ARRAY['neurology', 'diagnostics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_300', 'Antiepileptic drug therapy and monitoring', '抗癲癇藥物治療與監測', 'A', 0, ARRAY['neurology', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_301', 'Intervertebral disc disease diagnosis and grading', '椎間盤疾病診斷與分級', 'I', 0, ARRAY['neurology', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_302', 'Atlantoaxial instability evaluation', '環枕寰樞不穩定評估', 'A', 0, ARRAY['neurology', 'orthopedics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_303', 'Vestibular disease differential diagnosis', '前庭疾病鑑別診斷', 'V', 0, ARRAY['neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_304', 'Meningoencephalitis treatment protocols', '腦膜腦炎治療方案', 'M', 0, ARRAY['neurology', 'immunology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_305', 'Myelomalacia assessment', '脊髓軟化症評估', 'M', 0, ARRAY['neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_306', 'Neurological emergency triage (Modified Glasgow Coma Scale)', '神經系統急診分流（Modified Glasgow Coma Scale）', 'N', 0, ARRAY['neurology', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

-- M. Reproduction (5)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_307', 'Vaginal cytology', '陰道細胞學檢查', 'V', 0, ARRAY['reproduction', 'cytology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_308', 'Semen collection and evaluation', '精液採集與評估', 'S', 0, ARRAY['reproduction'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_309', 'Pregnancy diagnosis by abdominal ultrasound', '腹部超音波妊娠診斷', 'P', 0, ARRAY['reproduction', 'imaging'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_310', 'Artificial insemination', '人工授精', 'A', 0, ARRAY['reproduction'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_311', 'Neonatal puppy/kitten resuscitation', '新生犬貓急救處置', 'N', 0, ARRAY['reproduction', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

-- N. Nutrition (5)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_312', 'Nutritional assessment and body condition scoring (BCS/MCS)', '營養評估與體態評分（BCS/MCS）', 'N', 0, ARRAY['nutrition'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_313', 'Enteral nutrition protocol design', '腸道營養方案設計', 'E', 0, ARRAY['nutrition'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_314', 'Total parenteral nutrition (TPN) compounding and administration', '全靜脈營養（TPN）調配與給予', 'T', 0, ARRAY['nutrition', 'critical-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_315', 'Partial parenteral nutrition (PPN) administration', '部分靜脈營養（PPN）給予', 'P', 0, ARRAY['nutrition', 'critical-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_316', 'Jejunostomy tube placement and management', '空腸造廔管放置與管理', 'J', 0, ARRAY['nutrition', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

-- O. Clinical Pathology (10)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_317', 'Body fluid analysis and effusion classification', '體液分析與滲出液分類', 'B', 0, ARRAY['clinical-pathology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_318', 'Cytology smear interpretation fundamentals', '細胞學抹片判讀基礎', 'C', 0, ARRAY['clinical-pathology', 'cytology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_319', 'Lymph node FNA cytology', '淋巴結細針抽吸細胞學', 'L', 0, ARRAY['clinical-pathology', 'cytology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_320', 'Mass FNA cytology', '腫塊細針抽吸細胞學', 'M', 0, ARRAY['clinical-pathology', 'cytology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_321', 'Urine sediment microscopy', '尿沉渣鏡檢', 'U', 0, ARRAY['clinical-pathology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_322', 'Fecal flotation for parasitology', '糞便浮游法寄生蟲檢查', 'F', 0, ARRAY['clinical-pathology', 'parasitology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_323', 'Fecal direct smear examination', '糞便直接抹片檢查', 'F', 0, ARRAY['clinical-pathology', 'parasitology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_324', 'Blood parasite microscopy', '血液寄生蟲鏡檢', 'B', 0, ARRAY['clinical-pathology', 'parasitology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_325', 'Point-of-care hematology analyzer operation', '即時血液學分析儀操作', 'P', 0, ARRAY['clinical-pathology', 'laboratory'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_326', 'Point-of-care biochemistry analyzer operation', '即時生化分析儀操作', 'P', 0, ARRAY['clinical-pathology', 'laboratory'])
ON CONFLICT (procedure_id) DO NOTHING;

-- P. Infectious Disease (8)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_327', 'Sepsis recognition and early management', '敗血症辨識與早期處置', 'S', 0, ARRAY['infectious', 'emergency'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_328', 'Blood culture collection technique', '血液培養採集技術', 'B', 0, ARRAY['infectious', 'clinical-pathology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_329', 'Antimicrobial stewardship principles', '抗微生物藥物合理使用', 'A', 0, ARRAY['infectious', 'pharmacology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_330', 'Nosocomial infection control measures', '院內感染控制措施', 'N', 0, ARRAY['infectious'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_331', 'Isolation ward management', '隔離病房管理', 'I', 0, ARRAY['infectious'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_332', 'Canine distemper/parvovirus infection management', '犬瘟熱/小病毒感染處置', 'C', 0, ARRAY['infectious'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_333', 'Feline infectious peritonitis (FIP) management', '貓傳染性腹膜炎處置', 'F', 0, ARRAY['infectious'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_334', 'Leptospirosis diagnosis and treatment', '鉤端螺旋體病診斷與治療', 'L', 0, ARRAY['infectious', 'zoonosis'])
ON CONFLICT (procedure_id) DO NOTHING;

-- Q. Urology (5)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_335', 'Peritoneal dialysis catheter placement and operation', '腹膜透析導管放置與操作', 'P', 0, ARRAY['nephrology', 'critical-care'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_336', 'Subcutaneous ureteral bypass (SUB) system placement', '輸尿管支架放置（SUB system）', 'S', 0, ARRAY['urology', 'surgery'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_337', 'Urolithiasis analysis and prevention protocols', '尿路結石分析與預防方案', 'U', 0, ARRAY['urology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_338', 'Micturition disorder diagnostic approach', '排尿障礙診斷流程', 'M', 0, ARRAY['urology', 'neurology'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_339', 'Cystoscopy', '膀胱鏡檢查', 'C', 0, ARRAY['urology', 'endoscopy'])
ON CONFLICT (procedure_id) DO NOTHING;

-- R. Behavior & Palliative (4)
INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_340', 'Euthanasia technique and client communication', '安樂死執行技術與溝通', 'E', 0, ARRAY['palliative', 'ethics'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_341', 'Palliative and hospice care planning', '安寧緩和醫療計劃', 'P', 0, ARRAY['palliative', 'pain'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_342', 'Basic behavioral assessment', '行為問題基礎評估', 'B', 0, ARRAY['behavior'])
ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (procedure_id, name, name_zh, category, page_number, tags)
VALUES ('proc_343', 'Fear-free and low-stress handling techniques', '恐懼焦慮犬貓低壓保定技術', 'F', 0, ARRAY['behavior', 'handling'])
ON CONFLICT (procedure_id) DO NOTHING;
