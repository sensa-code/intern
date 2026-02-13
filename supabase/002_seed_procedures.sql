-- 載入獸醫程序資料
-- 總計 62 個程序

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_001',
  'Abdominocentesis',
  'A',
  11,
  NULL,
  '• Coagulopathy E • Marked distension of an abdominal viscus • Severe organomegaly F Equipment G • As required for Aseptic preparation – (a) non-surgical H',
  '• Clippers P • Cotton wool or soft swabs • 4% chlorhexidine gluconate or 10% povidone–iodine Q • 70% surgical spirit • Synthetic ACTH (0.25 mg/ml solution) (Tetracosactide, R Tetracosactrin) • Hypodermic needles: 21 G; ¾ to 1 inch S • Intravenous catheter • 2 ml syringes T • Heparin and/or plain tubes Patient preparation and positioning • The patient should be conscious. • The patient is restrained in sternal recumbency or in a sitting position for collection of blood from the jugular vein and then for intravenous injection into the cephalic vein (see Blood sampling – (b) venous). • The area over the vessel to be sampled is clipped. • Using cotton wool or soft swabs, the clipped area is wiped with 4% chlorhexidine gluconate or 10% povidone–iodine followed by 70% surgical spirit.',
  NULL,
  'R • Abdominocentesis is performed using either a single centesis or a four-quadrant approach. In patients with smaller effusions, the chances of fluid retrieval can be increased using ultrasound- guided aspiration. • The site for single',
  NULL,
  NULL,
  'W • Aspiration of blood: if blood is aspirated, stop the aspiration, place X the blood in a glass tube and observe for clot formation. Blood from the abdominal cavity, i.e. haemorrhagic effusions, will not Y clot, whereas blood from a vessel or organ will clot. If bleeding persists, abdominal pressure should be applied by way of manual Z compression or a pressure bandage Procedures in Small Animal Practice 3 • Puncture of the GI tract: if fl uid suggestive of GI contents is obtained, indicating that the GI tract has been punctured, any hole should seal when the needle is removed. The patient should, however, be monitored for developing peritonitis • Continued drainage after needle removal: in some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing may be applied E For interpretation of the results of fl uid analysis, see the BSAVA Manual of Canine and Feline Clinical Pathology. H ACTH response test Indications/Use J • Distinguishing spontaneous from iatrogenic hyperadrenocorticism • Aid to diagnosis of hypoadrenocorticism (reliability identifi es >50% K of dogs with adrenal-dependent HAC and about 85% of dogs with pituitary-dependent HAC) L • Monitoring trilostane or mitotane therapy • To aid the diagnosis of feline hyperadrenocorticism, especially M when combined with the dexamethasone suppression test – (b) high dose O',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_002',
  'ACTH response test',
  'A',
  13,
  NULL,
  NULL,
  '• Clippers P • Cotton wool or soft swabs • 4% chlorhexidine gluconate or 10% povidone–iodine Q • 70% surgical spirit • Synthetic ACTH (0.25 mg/ml solution) (Tetracosactide, R Tetracosactrin) • Hypodermic needles: 21 G; ¾ to 1 inch S • Intravenous catheter • 2 ml syringes T • Heparin and/or plain tubes Patient preparation and positioning • The patient should be conscious. • The patient is restrained in sternal recumbency or in a sitting position for collection of blood from the jugular vein and then for intravenous injection into the cephalic vein (see Blood sampling – (b) venous). • The area over the vessel to be sampled is clipped. • Using cotton wool or soft swabs, the clipped area is wiped with 4% chlorhexidine gluconate or 10% povidone–iodine followed by 70% surgical spirit. 4 Procedures in Small Animal Practice',
  NULL,
  'A 1. Collect a blood sample (approximately 2 ml) from the jugular vein B (see Blood sampling – (b) venous) and place into a heparin or plain tube to enable measurement of the basal cortisol C concentration. 2. Inject 0.25 mg of synthetic ACTH into the cephalic vein. D NB In dogs <5 kg and cats, use only 0.125 mg. When dealing with a very small dose of synthetic F ACTH, it is preferable to place an intravenous catheter to ensure that the entire dose is G administered. H 3. After 30–60 minutes, collect a second blood sample (approximately 2 ml) from the jugular vein and place into a I separate heparin or plain tube. 4. Ensure the tubes are labelled correctly. J 5. Separate the serum or plasma prior to sending the samples to the laboratory. L For interpretation of ACTH response test results, see the BSAVA Manual of Canine and Feline Endocrinology. O Adrenocorticotrophin response test see • ACTH response test R Anaphylaxis – emergency treatment Identifi cation Anaphylaxis is an acute severe allergic reaction characterized by venous and arteriolar dilation and increased capillary permeability, which result in decreased venous return to the heart, hypotension and hypovolaemia. Signs of hypovolaemic shock may be associated with: • Angioedema: this commonly results in facial swelling and swelling of the distal limbs but can include pharyngeal and laryngeal swelling • Bronchospasm • Pruritus • Urticaria: raised red skin wheals or hives • Vomiting. Procedures in Small Animal Practice 5',
  'A 1. Establish and maintain an airway: intubate if necessary. 2. Check the animal’s breathing: administer 100% oxygen via a non- B rebreathing mask if dyspnoea is present without airway obstruction. 3. Place a large intravenous catheter. C 4. Adrenaline (0.02 mg/kg slowly i.v or into the trachea via an endotracheal tube if intravenous access is not available) should D be given in life-threatening cases. Continuous monitoring of cardiovascular status for adrenaline-induced arrhythmias and E hypertension and response to therapy is required. 5. Treat hypovolaemic shock with intravenous fl uid therapy. F Intravenous fl uid therapy should be tapered to the individual and determined by continuous cardiovascular and respiratory G assessment of the patient to achieve and maintain cardiovascular stability. As a guide, shock boluses of crystalloids (90 ml/kg/h for a H dog and 60 ml/kg/h for a cat) may be required initially. Supplemental boluses of colloids (10 ml/kg/h for a dog and I 6 ml/kg/h for a cat) may also be required during initial stabilization. Maintenance therapy may require a combination of crystalloids J and colloids due to ongoing fl uid losses into the interstitium. 6. In animals with hypotension confi rmed by blood pressure K measurement, which has not responded to steps 4 and 5, vasopressors such as dobutamine (5–15 µg/kg/min) or dopamine L (3–10 µg/kg/min) may be required. Treatment with these drugs requires frequent or continuous blood pressure measurement. M 7. In animals with bronchospasm and life-threatening angioedema, including laryngeal oedema, dexamethasone (1–2 mg/kg i.v.) and N diphenhydramine (0.5–1 mg/kg slow i.v. or i.m.) may be useful adjunctive treatments. 8. Identifi cation and avoidance of the causative factor is important for long-term management. For further discussion of the treatment of hypovolaemic shock see the BSAVA Manual of Canine and Feline Emergency and Critical Care. T Arthrocentesis U Indications/Use V • Joint disease of unknown aetiology • Pain on manipulation of a joint • Joint effusion X • Joint heat • Periarticular thickening Y • Suspected immune-mediated joint disease (e.g. pyrexia of unknown origin) Z',
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_003',
  'Anaphylaxis – emergency treatment',
  'A',
  15,
  NULL,
  NULL,
  'C • As required for Aseptic preparation – (a) non-surgical D procedures Sterile gloves should be worn if the clinician wishes to palpate bony landmarks and the needle insertion site. As experience is gained, such palpation is not necessary and gloves may not be required, provided the needle insertion point is not touched. H • Hypodermic needles: 21–23 G; 5/ 8 to 1.5 inch, depending on joint size I • 2 ml syringes • Microscope slides J • EDTA and heparin collection tubes • Blood culture bottle/bacteriology swab in transport medium Patient preparation and positioning • Sedation or general anaesthesia are required. • The patient is placed in lateral recumbency, with the affected joint uppermost. • The joint for aspiration will often be dictated by the findings on clinical examination, e.g. pain on joint manipulation. • Aseptic preparation – (a) non-surgical procedures is performed on an area approximately 5 cm x 5 cm over the site for arthrocentesis. Q Technique 1. a. Carpus: The antebrachiocarpal R joint is generally the most accessible. With the carpus fully S flexed, the antebrachiocarpal joint is palpable as a depression just distal T to the radius. Insert the needle medial to the common digital U extensor tendon and cephalic vein, which pass over the centre of the V joint space. The needle insertion site is just lateral to the tendon of extensor carpi radialis. Y Procedures in Small Animal Practice 7 b. Tarsus (hock): The talocrural joint space is most readily aspirated. Flex and extend the talocrural joint to locate the position of the joint. With the joint in a neutral position, insert the needle on the dorsolateral aspect of the talocrural joint, just medial to the palpable lateral malleolus of the fibula, and advance it towards the plantaromedial aspect of the joint. Alternative: The plantarolateral joint space may be aspirated by inserting the needle parallel to the calcaneus, just medial to the lateral malleolus. c. Stifle: The joint capsule of the stifle has three sacs, all of which communicate. With the joint partially flexed, apply digital pressure to the joint capsule on the medial side of the patellar ligament. Introduce the needle lateral to the straight patellar ligament, K midway between the femur and tibia. Direct the needle into the joint space, L through the fat pad, towards the intercondylar space. If no synovial fluid M is aspirated, the needle should be moved inwards or outwards and N re-aspiration attempted, as the needle tip may be located in the fat pad. O Alternative: The needle can be inserted parallel to the straight P patellar ligament, midway between the tibial tuberosity and patella. The tip of the needle is directed lateral to the patella in Q the lateral parapatellar joint pouch. d. Elbow: The caudolateral approach is the easiest and most atraumatic. Flex S the elbow to approximately 45 degrees, and palpate the lateral condyle of the T humerus and the olecranon. Advance the needle parallel to the long axis of U the ulna, midway between these two landmarks. The needle should slide V between the lateral epicondylar crest of the humerus and the anconeal process W of the ulna. Y Z',
  NULL,
  '1. a. Carpus: The antebrachiocarpal R joint is generally the most accessible. With the carpus fully S flexed, the antebrachiocarpal joint is palpable as a depression just distal T to the radius. Insert the needle medial to the common digital U extensor tendon and cephalic vein, which pass over the centre of the V joint space. The needle insertion site is just lateral to the tendon of extensor carpi radialis. Y Procedures in Small Animal Practice 7 b. Tarsus (hock): The talocrural joint space is most readily aspirated. Flex and extend the talocrural joint to locate the position of the joint. With the joint in a neutral position, insert the needle on the dorsolateral aspect of the talocrural joint, just medial to the palpable lateral malleolus of the fibula, and advance it towards the plantaromedial aspect of the joint. Alternative: The plantarolateral joint space may be aspirated by inserting the needle parallel to the calcaneus, just medial to the lateral malleolus. c. Stifle: The joint capsule of the stifle has three sacs, all of which communicate. With the joint partially flexed, apply digital pressure to the joint capsule on the medial side of the patellar ligament. Introduce the needle lateral to the straight patellar ligament, K midway between the femur and tibia. Direct the needle into the joint space, L through the fat pad, towards the intercondylar space. If no synovial fluid M is aspirated, the needle should be moved inwards or outwards and N re-aspiration attempted, as the needle tip may be located in the fat pad. O Alternative: The needle can be inserted parallel to the straight P patellar ligament, midway between the tibial tuberosity and patella. The tip of the needle is directed lateral to the patella in Q the lateral parapatellar joint pouch. d. Elbow: The caudolateral approach is the easiest and most atraumatic. Flex S the elbow to approximately 45 degrees, and palpate the lateral condyle of the T humerus and the olecranon. Advance the needle parallel to the long axis of U the ulna, midway between these two landmarks. The needle should slide V between the lateral epicondylar crest of the humerus and the anconeal process W of the ulna. Y Z',
  'A 1. Establish and maintain an airway: intubate if necessary. 2. Check the animal’s breathing: administer 100% oxygen via a non- B rebreathing mask if dyspnoea is present without airway obstruction. 3. Place a large intravenous catheter. C 4. Adrenaline (0.02 mg/kg slowly i.v or into the trachea via an endotracheal tube if intravenous access is not available) should D be given in life-threatening cases. Continuous monitoring of cardiovascular status for adrenaline-induced arrhythmias and E hypertension and response to therapy is required. 5. Treat hypovolaemic shock with intravenous fl uid therapy. F Intravenous fl uid therapy should be tapered to the individual and determined by continuous cardiovascular and respiratory G assessment of the patient to achieve and maintain cardiovascular stability. As a guide, shock boluses of crystalloids (90 ml/kg/h for a H dog and 60 ml/kg/h for a cat) may be required initially. Supplemental boluses of colloids (10 ml/kg/h for a dog and I 6 ml/kg/h for a cat) may also be required during initial stabilization. Maintenance therapy may require a combination of crystalloids J and colloids due to ongoing fl uid losses into the interstitium. 6. In animals with hypotension confi rmed by blood pressure K measurement, which has not responded to steps 4 and 5, vasopressors such as dobutamine (5–15 µg/kg/min) or dopamine L (3–10 µg/kg/min) may be required. Treatment with these drugs requires frequent or continuous blood pressure measurement. M 7. In animals with bronchospasm and life-threatening angioedema, including laryngeal oedema, dexamethasone (1–2 mg/kg i.v.) and N diphenhydramine (0.5–1 mg/kg slow i.v. or i.m.) may be useful adjunctive treatments. 8. Identifi cation and avoidance of the causative factor is important for long-term management. For further discussion of the treatment of hypovolaemic shock see the BSAVA Manual of Canine and Feline Emergency and Critical Care. T Arthrocentesis U Indications/Use V • Joint disease of unknown aetiology • Pain on manipulation of a joint • Joint effusion X • Joint heat • Periarticular thickening Y • Suspected immune-mediated joint disease (e.g. pyrexia of unknown origin) Z 6 Procedures in Small Animal Practice • Suspected infective arthritis • Monitoring response to therapy in infective arthritis and immune- mediated polyarthritis B',
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_004',
  'Arthrocentesis',
  'A',
  16,
  NULL,
  NULL,
  'C • As required for Aseptic preparation – (a) non-surgical D procedures Sterile gloves should be worn if the clinician wishes to palpate bony landmarks and the needle insertion site. As experience is gained, such palpation is not necessary and gloves may not be required, provided the needle insertion point is not touched. H • Hypodermic needles: 21–23 G; 5/ 8 to 1.5 inch, depending on joint size I • 2 ml syringes • Microscope slides J • EDTA and heparin collection tubes • Blood culture bottle/bacteriology swab in transport medium Patient preparation and positioning • Sedation or general anaesthesia are required. • The patient is placed in lateral recumbency, with the affected joint uppermost. • The joint for aspiration will often be dictated by the findings on clinical examination, e.g. pain on joint manipulation. • Aseptic preparation – (a) non-surgical procedures is performed on an area approximately 5 cm x 5 cm over the site for arthrocentesis. Q Technique 1. a. Carpus: The antebrachiocarpal R joint is generally the most accessible. With the carpus fully S flexed, the antebrachiocarpal joint is palpable as a depression just distal T to the radius. Insert the needle medial to the common digital U extensor tendon and cephalic vein, which pass over the centre of the V joint space. The needle insertion site is just lateral to the tendon of extensor carpi radialis. Y Procedures in Small Animal Practice 7 b. Tarsus (hock): The talocrural joint space is most readily aspirated. Flex and extend the talocrural joint to locate the position of the joint. With the joint in a neutral position, insert the needle on the dorsolateral aspect of the talocrural joint, just medial to the palpable lateral malleolus of the fibula, and advance it towards the plantaromedial aspect of the joint. Alternative: The plantarolateral joint space may be aspirated by inserting the needle parallel to the calcaneus, just medial to the lateral malleolus. c. Stifle: The joint capsule of the stifle has three sacs, all of which communicate. With the joint partially flexed, apply digital pressure to the joint capsule on the medial side of the patellar ligament. Introduce the needle lateral to the straight patellar ligament, K midway between the femur and tibia. Direct the needle into the joint space, L through the fat pad, towards the intercondylar space. If no synovial fluid M is aspirated, the needle should be moved inwards or outwards and N re-aspiration attempted, as the needle tip may be located in the fat pad. O Alternative: The needle can be inserted parallel to the straight P patellar ligament, midway between the tibial tuberosity and patella. The tip of the needle is directed lateral to the patella in Q the lateral parapatellar joint pouch. d. Elbow: The caudolateral approach is the easiest and most atraumatic. Flex S the elbow to approximately 45 degrees, and palpate the lateral condyle of the T humerus and the olecranon. Advance the needle parallel to the long axis of U the ulna, midway between these two landmarks. The needle should slide V between the lateral epicondylar crest of the humerus and the anconeal process W of the ulna. Y 8 Procedures in Small Animal Practice e. Shoulder: With the shoulder in a neutral position, palpate the acromion process and introduce the needle perpendicular to the skin directly below the acromion. Distal traction can be applied to the limb by an assistant to open the joint space if required. If the needle hits bone, gently ‘walk’ the needle a few millimetres proximally or distally until the joint is penetrated. F 2. Attach a syringe to the needle and gently aspirate until synovial G fl uid appears in the hub of the needle. 3. Once suffi cient fl uid has entered the syringe (which may only H be a hubful), release the suction to minimize inadvertent aspiration of blood, before withdrawing the needle and syringe. I To reduce the chance of blood contamination further, the syringe can be removed from the needle prior to needle removal from J the joint space. K Sample handling • To maximize preservation of cell morphology, smears should be made immediately and allowed to air dry. • If more than approximately 0.2–0.3 ml of fl uid is obtained, this can be placed in an EDTA tube for cytological evaluation and total nucleated cell count. • Heparin is the preferred anticoagulant for the mucin precipitation O test and for measurement of viscosity. • If bacterial infective arthritis is suspected, synovial fl uid should be P placed in blood culture media. Alternatively, a few drops of fl uid can be placed on a sterile bacteriology swab placed in transport Q medium. R Potential complications • Iatrogenic articular cartilage damage S • Joint infection Details of the evaluation of synovial fl uid are given in the BSAVA Manual of Canine and Feline Clinical Pathology and in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. X Z',
  NULL,
  '1. a. Carpus: The antebrachiocarpal R joint is generally the most accessible. With the carpus fully S flexed, the antebrachiocarpal joint is palpable as a depression just distal T to the radius. Insert the needle medial to the common digital U extensor tendon and cephalic vein, which pass over the centre of the V joint space. The needle insertion site is just lateral to the tendon of extensor carpi radialis. Y Procedures in Small Animal Practice 7 b. Tarsus (hock): The talocrural joint space is most readily aspirated. Flex and extend the talocrural joint to locate the position of the joint. With the joint in a neutral position, insert the needle on the dorsolateral aspect of the talocrural joint, just medial to the palpable lateral malleolus of the fibula, and advance it towards the plantaromedial aspect of the joint. Alternative: The plantarolateral joint space may be aspirated by inserting the needle parallel to the calcaneus, just medial to the lateral malleolus. c. Stifle: The joint capsule of the stifle has three sacs, all of which communicate. With the joint partially flexed, apply digital pressure to the joint capsule on the medial side of the patellar ligament. Introduce the needle lateral to the straight patellar ligament, K midway between the femur and tibia. Direct the needle into the joint space, L through the fat pad, towards the intercondylar space. If no synovial fluid M is aspirated, the needle should be moved inwards or outwards and N re-aspiration attempted, as the needle tip may be located in the fat pad. O Alternative: The needle can be inserted parallel to the straight P patellar ligament, midway between the tibial tuberosity and patella. The tip of the needle is directed lateral to the patella in Q the lateral parapatellar joint pouch. d. Elbow: The caudolateral approach is the easiest and most atraumatic. Flex S the elbow to approximately 45 degrees, and palpate the lateral condyle of the T humerus and the olecranon. Advance the needle parallel to the long axis of U the ulna, midway between these two landmarks. The needle should slide V between the lateral epicondylar crest of the humerus and the anconeal process W of the ulna. Y 8 Procedures in Small Animal Practice e. Shoulder: With the shoulder in a neutral position, palpate the acromion process and introduce the needle perpendicular to the skin directly below the acromion. Distal traction can be applied to the limb by an assistant to open the joint space if required. If the needle hits bone, gently ‘walk’ the needle a few millimetres proximally or distally until the joint is penetrated. F 2. Attach a syringe to the needle and gently aspirate until synovial G fl uid appears in the hub of the needle. 3. Once suffi cient fl uid has entered the syringe (which may only H be a hubful), release the suction to minimize inadvertent aspiration of blood, before withdrawing the needle and syringe. I To reduce the chance of blood contamination further, the syringe can be removed from the needle prior to needle removal from J the joint space. K Sample handling • To maximize preservation of cell morphology, smears should be made immediately and allowed to air dry. • If more than approximately 0.2–0.3 ml of fl uid is obtained, this can be placed in an EDTA tube for cytological evaluation and total nucleated cell count. • Heparin is the preferred anticoagulant for the mucin precipitation O test and for measurement of viscosity. • If bacterial infective arthritis is suspected, synovial fl uid should be P placed in blood culture media. Alternatively, a few drops of fl uid can be placed on a sterile bacteriology swab placed in transport Q medium. R Potential complications • Iatrogenic articular cartilage damage S • Joint infection Details of the evaluation of synovial fl uid are given in the BSAVA Manual of Canine and Feline Clinical Pathology and in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. X Z',
  NULL,
  NULL,
  '• Iatrogenic articular cartilage damage S • Joint infection Details of the evaluation of synovial fl uid are given in the BSAVA Manual of Canine and Feline Clinical Pathology and in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. X Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_005',
  'Aseptic preparation',
  'A',
  20,
  'W • Skin preparation for all surgical procedures X',
  NULL,
  'Y • Regularly maintained clean, sharp electric clippers • Vacuum cleaner • Cotton wool or soft swabs Procedures in Small Animal Practice 11 • Container to hold used cotton wool or soft swabs • Tap water • Appropriate antiseptic – For routine preparation of healthy skin, 4% chlorhexidine gluconate or 10% povidone– iodine, used in combination with 70% surgical spirit, is appropriate – Chlorhexidine gluconate or povidone–iodine should be avoided in animals with known skin sensitivities to either of these antiseptics – Chlorhexidine gluconate is specifically toxic to the conjunctiva, cornea, meninges and middle and inner ear: 0.2% povidone– iodine solution without alcohol is recommended for preparation of the periocular area but must not be allowed to contact the cornea; 1% povidone–iodine solution without alcohol is recommended for preparation of the external ear canal for H',
  NULL,
  NULL,
  NULL,
  NULL,
  'R • Clipper rash • Dermatitis due to idiosyncratic reaction to antiseptic S • Break in asepsis Aseptic preparation – (b) surgical U',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_006',
  'Barium contrast media',
  'B',
  23,
  'U • Regurgitation • Retching • Dysphagia • Vomiting of undigested food soon after eating X Particular care should be taken when administering barium to animals with swallowing disorders so as to Y minimize the risk of aspiration of contrast medium and subsequent inhalation pneumonia. Z',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_007',
  'Barium studies of the gastrointestinal tract',
  'B',
  24,
  'U • Regurgitation • Retching • Dysphagia • Vomiting of undigested food soon after eating X Particular care should be taken when administering barium to animals with swallowing disorders so as to Y minimize the risk of aspiration of contrast medium and subsequent inhalation pneumonia. Z 16 Procedures in Small Animal Practice',
  'A • Suspected or confi rmed oesophageal perforation: use non-ionic B iodinated contrast media instead',
  'C • Barium sulphate (see Barium contrast media) D • Lukewarm water for dilution • Soft tinned food E • Food bowl • 20–60 ml syringe with catheter tip F • Radiographic equipment Patient preparation and positioning • The patient should be conscious if possible. Light sedation can be H used if necessary, although this will increase the risk of contrast medium aspiration and may alter oesophageal function. I • Contrast medium should be administered orally, with the patient in a sitting or standing position. J • The animal is subsequently positioned for radiographs as detailed below. K',
  NULL,
  'L 1. Take plain lateral and ventrodorsal radiographs of the thorax and cranial abdomen. This is important, as signifi cant fi ndings such as M foreign material may be masked by contrast medium. 2. Administer thick barium sulphate paste (60% w/v) orally, via a N syringe at a dose of approximately 1 ml per 5 kg bodyweight.',
  NULL,
  NULL,
  'U • Aspiration pneumonia • Vomiting • Diarrhoea Further information on contrast radiography of the oesophagus and its evaluation can be found in the BSAVA Manual of Canine and Feline Thoracic Imaging and the BSAVA Manual of Canine and Z Feline Gastroenterology.',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_008',
  'Blood pressure measurement',
  'B',
  26,
  'D • Persistent vomiting • Haematemesis E • Displacement of the GI tract associated with diaphragmatic rupture F • Assessment of GI tract displacement by changes in size or position of adjacent organs G • Unexplained dilatation of the small intestine Particular care should be taken when administering I barium to animals with swallowing disorders so as to minimize the risk of aspiration of contrast medium J and subsequent inhalation pneumonia. Contraindications L • Suspected GI tract rupture • Convincing evidence of small intestinal dilatation on plain fi lms, with a strong suspicion of mechanical obstruction N',
  'A • Suspected or confi rmed oesophageal perforation: use non-ionic B iodinated contrast media instead',
  'C • Barium sulphate (see Barium contrast media) D • Lukewarm water for dilution • Soft tinned food E • Food bowl • 20–60 ml syringe with catheter tip F • Radiographic equipment Patient preparation and positioning • The patient should be conscious if possible. Light sedation can be H used if necessary, although this will increase the risk of contrast medium aspiration and may alter oesophageal function. I • Contrast medium should be administered orally, with the patient in a sitting or standing position. J • The animal is subsequently positioned for radiographs as detailed below. K',
  NULL,
  'L 1. Take plain lateral and ventrodorsal radiographs of the thorax and cranial abdomen. This is important, as signifi cant fi ndings such as M foreign material may be masked by contrast medium. 2. Administer thick barium sulphate paste (60% w/v) orally, via a N syringe at a dose of approximately 1 ml per 5 kg bodyweight.',
  NULL,
  NULL,
  'U • Aspiration pneumonia • Vomiting • Diarrhoea Further information on contrast radiography of the oesophagus and its evaluation can be found in the BSAVA Manual of Canine and Feline Thoracic Imaging and the BSAVA Manual of Canine and Z Feline Gastroenterology. Procedures in Small Animal Practice 17 Barium studies of the gastrointestinal tract – (b) stomach and small intestine Indications/Use • Persistent vomiting • Haematemesis E • Displacement of the GI tract associated with diaphragmatic rupture F • Assessment of GI tract displacement by changes in size or position of adjacent organs G • Unexplained dilatation of the small intestine Particular care should be taken when administering I barium to animals with swallowing disorders so as to minimize the risk of aspiration of contrast medium J and subsequent inhalation pneumonia. Contraindications L • Suspected GI tract rupture • Convincing evidence of small intestinal dilatation on plain fi lms, with a strong suspicion of mechanical obstruction N',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_009',
  'Blood sampling',
  'B',
  31,
  NULL,
  'J • Coagulopathy: arterial catheters may be placed but only with care and only into distal limb arteries K • Arterial catheters should not be placed at sites where risk of bacterial contamination and infection are high, e.g. due to local L tissue damage, local skin infection, diarrhoea, urinary incontinence M Equipment N • No. 11 scalpel • 20–22 G peripheral venous over-the-needle catheter • T-connector or extension set containing heparinized saline (1 IU of heparin per ml of 0.9% saline) • 70% surgical spirit • Adhesive tape • Soft padded bandage and outer protective bandage • Non-compliant manometer tubing • Pressure transducer: must be ‘zeroed’ to ambient air at the level of the right atrium • Display monitor • Pressurized continuous flush system Patient preparation and positioning • The patient should be positioned in lateral recumbency. V • The patient’s limb must be held still; this can be achieved by manual restraint. W • For monitoring of the anaesthetized patient, arterial catheters should be placed soon after anaesthetic induction, and before the X animal’s blood pressure falls, as low BP makes palpation of a peripheral arterial pulse more challenging. Y 22 Procedures in Small Animal Practice',
  NULL,
  NULL,
  'D 1. Place a catheter into a peripheral artery. • Palpate the arterial pulse. E • The skin overlying the artery is clipped, then sprayed or lightly wiped with surgical spirit. Excessive scrubbing/wiping of the F skin should be avoided, as this may result in spasm of the artery. G • Make a small stab incision in the skin overlying the arterial pulse. H • A peripheral venous catheter is placed through the skin incision and then inserted into the artery using short, fi rm, purposeful movements to push the stylet and catheter through the muscular wall of the artery. For entry into the artery the catheter should be positioned at a slight angle to the artery – approximately 10–30 degrees. • The dorsal pedal artery runs at about 30 degrees to the long axis of the metatarsus from medial to lateral. During catheter placement, palpate the arterial pulse constantly proximal to the site of entry of the catheter into the artery. This allows the operator to guide the catheter tip towards the artery, which cannot be seen. • As soon as arterial blood is seen in the fl ash chamber of the catheter, the stylet and catheter are lowered to a position Q parallel to the artery and advanced together a little further into the artery, R before the catheter is advanced over the stylet and completely into the artery. S • Withdraw the catheter stylet and attach a T-connector or extension set containing T heparinized saline to the catheter. Arterial blood should be seen to pulsate within the U hub of the catheter or T-connector. • The catheter should be secured fi rmly in V place with adhesive tape and covered with a bandage. X The bandage over arterial catheters must be labelled clearly to avoid inadvertent administration of fl uids or Y drugs into an artery. Procedures in Small Animal Practice 23 2. Connect the T-connector to a pressure transducer via non- compliant tubing filled with heparinized saline. 3. To allow trouble-free continuous monitoring (avoiding clotting in the arterial line), the set-up is combined with a pressurized continuous flush system. If this is not available, arterial catheters should be flushed hourly. 4. The transducer–monitor combination gives a continuous reading of blood pressure and shows the pressure waveform. Systolic and diastolic pressures are taken as the cyclic maximum and minimum pressures, respectively. Mean pressure is calculated automatically. Arterial blood pressure monitoring is usually continuous. Monitor G H',
  NULL,
  NULL,
  'W • Excessive arterial bleeding/exsanguination following a failed attempt at catheterization or accidental removal of the catheter: firm pressure should be applied to the site for 10 to 15 minutes • Vascular damage and subsequent tissue necrosis distal to the catheter. The risk of this complication can be minimized by: – Avoiding placing adhesive tape too tightly around the paw – Never using arterial catheters for giving drugs or fluids',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_010',
  'Blood smear preparation',
  'B',
  35,
  'U • To obtain a sample of arterial blood for assessment of respiratory V function or acid–base status W Contraindications • Coagulopathy • Sampling should not be performed at sites where risk of bacterial contamination and infection are high, e.g. due to local tissue damage, local skin infection, diarrhoea, urinary incontinence Procedures in Small Animal Practice 27',
  '• Coagulopathy • Sampling should not be performed at sites where risk of bacterial contamination and infection are high, e.g. due to local tissue damage, local skin infection, diarrhoea, urinary incontinence Procedures in Small Animal Practice 27',
  'A • Hypodermic needle: – Cats: 23–25 G; 5/ 8 inch B – Dogs: 23 G; 5/ inch 8 • 2 ml syringe C • Heparin sodium: this is used to pre-coat the syringe and needle used for blood collection; approximately 0.5 ml of heparin sodium D is aspirated into the 2 ml syringe via the needle and then expelled. Alternatively, pre-heparinized blood-gas syringes with needles E attached can be used • 70% surgical spirit F • Cotton wool or gauze swabs • 25 mm wide adhesive tape G Patient preparation and positioning H • Arterial blood sampling is performed in the conscious animal. • Sedation should be avoided if possible as it will affect the result of blood gas analysis. • Animals should be positioned appropriately for the blood collection site (see below). Sites L Most commonly the dorsal pedal artery is used, but in cats and small dogs it is sometimes easier to use the femoral artery. M Dorsal pedal artery • The animal is placed in lateral recumbency, either on a table (cats and small dogs) or on the floor (large dogs), with the leg to be sampled placed closest to the table or floor. • An assistant restrains the patient’s head with one hand and the uppermost hindlimb with the other. • The artery is palpated just distal to the tarsus (hock), between the second and third metatarsal bones. U W Y Z',
  NULL,
  'D Doppler ultrasound An inflatable cuff attached to a manometer occludes an artery, and a piezoelectric crystal placed over the artery distal to the cuff detects flow. The re-entry of blood into the artery as the cuff is released causes a frequency change (Doppler shift) in sound waves, which is detected by the piezoelectric crystal and converted to a sound detected by the operator. This method measures systolic pressure. 1. Position the Doppler ultrasound probe over one of the following: • The palmar arterial arch, on the ventral aspect of the proximal metacarpal region • The plantar arterial arch, on the ventral aspect of the proximal metatarsal region • The median caudal artery on the ventral aspect of the tail. 2. Apply coupling gel directly to the transducer and position it so that the sound of flow is detected. Tape the transducer in place perpendicular to the artery. 3. Place the cuff around the limb proximal to the measurement site, avoiding the joints, or around the tail. The cuff should be applied snugly enough to allow insertion of only a small finger between O the cuff and the leg or tail. Most cuffs have a mark that should be placed directly over the artery. P If the cuff is applied too tightly, the measurement will be erroneously low because the cuff partly occludes the artery; if applied too loosely, the measurement will be erroneously high because excessive cuff pressure will be required to occlude the artery. The cuff must be prevented from moving down the leg or tail when inflated, either by flexing the carpus or tarsus, or by blocking distal U movement of the cuff by placing a hand on the appendage, not on the cuff. V 4. Inflate the cuff to a pressure above the expected systolic pressure to occlude the artery. This will result in loss of the sound of flow. 5. Slowly deflate the cuff by a few mmHg per second until the sound of flow is again detected. At this time the cuff pressure is equal to the systolic pressure. In patients with very low systolic blood pressure (<70 mmHg), the value obtained may be closer to the mean rather than the systolic pressure. 26 Procedures in Small Animal Practice Oscillometric technique This uses a cuff to occlude the artery, and detects oscillations of the underlying artery when it is partly occluded. This system determines systolic, diastolic and mean arterial pressures. This method is less accurate in very small patients, patients with low blood pressure and patients with dysrhythmias. Muscle contractions also create oscillations and are a source of potential error. E 1. Place the cuff snugly (see Step 3 above) over one of the following: • The radial artery proximal to the carpus F • The saphenous artery proximal to the tarsus • The brachial artery proximal to the elbow G • The median caudal artery at the base of the tail. 2. Attach the cuff to a control unit that continually senses arterial H pressure and inflates to a pressure greater than systolic, and then automatically deflates the cuff. I 3. The heart rate is displayed; verify that it matches the patient’s heart rate by manually counting the heart rate by direct heart J auscultation or palpation of an artery. 4. Record the values for 3–5 cycles and report the averages for K systolic, diastolic and mean pressures. L Potential false readings Incorrect blood pressure readings may be obtained due to: • Inappropriate cuff size • Inappropriate placement of the cuff • Excessive motion of the limb or tail • Low blood pressure • Dysrhythmias • Obesity • Peripheral oedema • Limb conformation, which does not permit snug placement of the Q',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_011',
  'Blood transfusion',
  'B',
  37,
  'O • To obtain a sample of venous blood for clinical pathology tests or for bacterial culture P',
  'Q • Coagulopathy • Sampling should not be performed at sites where risk of bacterial R contamination and infection are high, e.g. due to local tissue damage, local skin infection, diarrhoea, urinary incontinence S Equipment T • Hypodermic needles: – Cats: 23–21 G; 5/ inch 8 – Dogs: 21 G; 5/ in or 1 inch 8 V • 2–10 ml syringes • 70% surgical spirit • 4% chlorhexidine gluconate or 10% povidone–iodine • Cotton wool or gauze swabs • 25 mm wide adhesive tape • Appropriate blood containers (see table below) and/or three blood culture bottles (pre-warmed to 37°C) • Sterile gloves Z',
  'A • Hypodermic needle: – Cats: 23–25 G; 5/ 8 inch B – Dogs: 23 G; 5/ inch 8 • 2 ml syringe C • Heparin sodium: this is used to pre-coat the syringe and needle used for blood collection; approximately 0.5 ml of heparin sodium D is aspirated into the 2 ml syringe via the needle and then expelled. Alternatively, pre-heparinized blood-gas syringes with needles E attached can be used • 70% surgical spirit F • Cotton wool or gauze swabs • 25 mm wide adhesive tape G Patient preparation and positioning H • Arterial blood sampling is performed in the conscious animal. • Sedation should be avoided if possible as it will affect the result of blood gas analysis. • Animals should be positioned appropriately for the blood collection site (see below). Sites L Most commonly the dorsal pedal artery is used, but in cats and small dogs it is sometimes easier to use the femoral artery. M Dorsal pedal artery • The animal is placed in lateral recumbency, either on a table (cats and small dogs) or on the floor (large dogs), with the leg to be sampled placed closest to the table or floor. • An assistant restrains the patient’s head with one hand and the uppermost hindlimb with the other. • The artery is palpated just distal to the tarsus (hock), between the second and third metatarsal bones. U W Y 28 Procedures in Small Animal Practice Femoral artery • The animal is placed in lateral recumbency, either on a table (cats and small dogs) or on the floor (large dogs), with the leg to be sampled placed closest to the table or floor. • The animal is restrained manually, and the upper limb abducted so that the femoral F artery can be palpated. • The femoral artery pulse is G palpable on the medial thigh, ventral to the inguinal region and H proximal to the stifle. J K Technique 1. Stretch the skin over the artery. 2. Palpate the artery so that its pulsation can be felt. 3. The skin overlying the artery is clipped, then sprayed or lightly wiped with surgical spirit. Excessive scrubbing/wiping of the skin N should be avoided, as this may result in spasm of the artery. 4. Direct the needle, with syringe attached, toward the palpated O artery, at an angle of about 30 degrees. The needle bevel is pointed upwards. P 5. Penetrate the artery in one quick firm purposeful movement. 6. When the artery has been penetrated, a flash of blood will be Q seen in the hub of the needle. 7. Collect approximately 1 ml of blood. R 8. Remove the syringe and needle from the artery. 9. On removal of the needle, apply direct pressure to the artery for S 5 minutes, then cover with cotton wool or a gauze swab and adhesive tape. T 10. Hold the syringe upright and tap it to cause air bubbles to rise. Eject any air from the syringe. U 11. Cap the sample with an airtight seal to prevent exposure to room air. Rubber bungs or plastic caps are available with pre- V heparinized blood-gas syringes. 12. The blood sample must be analysed within 5 minutes. Potential complications • Significant haemorrhage is very uncommon, provided direct pressure is applied to the artery (see above) • Bruising and the formation of a small haematoma will occur in some patients, but can be minimized by good technique and by the application of direct pressure to the artery Procedures in Small Animal Practice 29 • Arterial thrombosis is uncommon but is more likely if repeated attempts are made to collect blood from an artery Approximate normal arterial blood gas values for dogs and cats breathing room air are given below. See the BSAVA Manual of Canine and Feline Clinical Pathology for further details on interpretation of results. Parameter Dogs Cats pH 7.35–7.46 7.31–7.46 PCO 30.8–42.8 mmHg 25.2–36.8 mmHg 2 (4.10–5.69 kPa) (3.35–4.89 kPa) PO 80.9–103.3 mmHg 95.4–118.2 mmHg 2 (10.76–13.74 kPa) (12.69–15.72 kPa) I [HCO 3 –] 18.8–25.6 mmol/l 14.4–21.6 mmol/l J Base excess 0 ± 4 0 ± 4 L Blood sampling – (b) venous Indications/Use • To obtain a sample of venous blood for clinical pathology tests or for bacterial culture P',
  NULL,
  '1. Stretch the skin over the artery. 2. Palpate the artery so that its pulsation can be felt. 3. The skin overlying the artery is clipped, then sprayed or lightly wiped with surgical spirit. Excessive scrubbing/wiping of the skin N should be avoided, as this may result in spasm of the artery. 4. Direct the needle, with syringe attached, toward the palpated O artery, at an angle of about 30 degrees. The needle bevel is pointed upwards. P 5. Penetrate the artery in one quick firm purposeful movement. 6. When the artery has been penetrated, a flash of blood will be Q seen in the hub of the needle. 7. Collect approximately 1 ml of blood. R 8. Remove the syringe and needle from the artery. 9. On removal of the needle, apply direct pressure to the artery for S 5 minutes, then cover with cotton wool or a gauze swab and adhesive tape. T 10. Hold the syringe upright and tap it to cause air bubbles to rise. Eject any air from the syringe. U 11. Cap the sample with an airtight seal to prevent exposure to room air. Rubber bungs or plastic caps are available with pre- V heparinized blood-gas syringes. 12. The blood sample must be analysed within 5 minutes. Potential complications • Significant haemorrhage is very uncommon, provided direct pressure is applied to the artery (see above) • Bruising and the formation of a small haematoma will occur in some patients, but can be minimized by good technique and by the application of direct pressure to the artery Procedures in Small Animal Practice 29 • Arterial thrombosis is uncommon but is more likely if repeated attempts are made to collect blood from an artery Approximate normal arterial blood gas values for dogs and cats breathing room air are given below. See the BSAVA Manual of Canine and Feline Clinical Pathology for further details on interpretation of results. Parameter Dogs Cats pH 7.35–7.46 7.31–7.46 PCO 30.8–42.8 mmHg 25.2–36.8 mmHg 2 (4.10–5.69 kPa) (3.35–4.89 kPa) PO 80.9–103.3 mmHg 95.4–118.2 mmHg 2 (10.76–13.74 kPa) (12.69–15.72 kPa) I [HCO 3 –] 18.8–25.6 mmol/l 14.4–21.6 mmol/l J Base excess 0 ± 4 0 ± 4 L Blood sampling – (b) venous Indications/Use • To obtain a sample of venous blood for clinical pathology tests or for bacterial culture P',
  NULL,
  NULL,
  'X • Significant haemorrhage is very uncommon, provided direct pressure is applied to the artery (see above) • Bruising and the formation of a small haematoma will occur in some patients, but can be minimized by good technique and by the application of direct pressure to the artery Procedures in Small Animal Practice 29 • Arterial thrombosis is uncommon but is more likely if repeated attempts are made to collect blood from an artery Approximate normal arterial blood gas values for dogs and cats breathing room air are given below. See the BSAVA Manual of Canine and Feline Clinical Pathology for further details on interpretation of results. Parameter Dogs Cats pH 7.35–7.46 7.31–7.46 PCO 30.8–42.8 mmHg 25.2–36.8 mmHg 2 (4.10–5.69 kPa) (3.35–4.89 kPa) PO 80.9–103.3 mmHg 95.4–118.2 mmHg 2 (10.76–13.74 kPa) (12.69–15.72 kPa) I [HCO 3 –] 18.8–25.6 mmol/l 14.4–21.6 mmol/l J Base excess 0 ± 4 0 ± 4 L Blood sampling – (b) venous Indications/Use • To obtain a sample of venous blood for clinical pathology tests or for bacterial culture P',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_012',
  'Bone biopsy – needle',
  'B',
  41,
  NULL,
  NULL,
  'H • Blood collected in an EDTA anticoagulant tube (see Blood sampling – (b) venous) I • Microhaematocrit tube • Microscope slides J • A ‘spreader’ slide: this is narrower than the smear slide to avoid spreading the cells over the edge of the slide. ‘Spreaders’ can be K made by breaking the corner off a normal slide, having first scored it with a blade or diamond writer L Technique M 1. Using a microhaematocrit tube, place a drop of well mixed blood in the centre line toward one end of a microscope slide. P 2. Hold the ‘spreader’ between the thumb and middle finger, Q placing the index finger on top of the ‘spreader’. R 3. Place the ‘spreader’ in front of the blood spot, at an angle of S about 30 degrees, and draw it backwards until it comes into T contact with the blood, allowing the blood to spread U out rapidly along the edge of the ‘spreadFeearth’.ered edge V 4. The moment this occurs, advance the ‘spreader’ W forwards smoothly and quickly. 5. As the smeFeaarth iesre dm eadgdee, a X ‘feathered edge’ forms. Do not lift the ‘spreader’ slide until the Y feathered edge is complete. Feathered edge',
  NULL,
  'A For biochemical tests or haematology B 1. Raise the vein by compressing it at a point closer to the heart than the venepuncture site. C 2. Insert the needle, with syringe attached, into the vein with the bevel upwards, at an angle of approximately 30 degrees. D 3. Aspirate blood by withdrawing the syringe plunger. Avoid excessive suction on the syringe as this may collapse the vein. E 4. Release the pressure on the vein. 5. Remove the needle and apply gentle pressure to the venepuncture site for a few seconds. 6. If the cephalic or saphenous veins are used, apply a light bandage of cotton wool held by adhesive tape for 30–60 minutes. 7. Place the blood sample in the appropriate tube(s). 8. Gently invert the sample tube several times to ensure adequate distribution of any additive. Do NOT shake the tube, as this may cause haemolysis. For bacterial culture K 1. Follow steps 1 to 5 above to take a 5–10 ml blood sample (see culture bottle for required volume). 6. Place a new needle on the syringe. M 7. Swab the rubber stopper of the culture bottle with surgical spirit and allow to dry. N 8. Add the required volume of blood to the pre-warmed culture bottle. 9. Collect three blood samples with a minimum of 1 hour between O samples OR, in acutely septic patients, all three samples can be taken over 30 minutes. P 10. The culture bottles should be transported to the laboratory as quickly as possible. Although not ideal, overnight postage may still Q give meaningful results. R Potential complications These are very uncommon but may include: • Minor haemorrhage T • Subcutaneous haematoma formation • Vascular trauma U • Thrombophlebitis For information on interpretation of blood samples W see the BSAVA Manual of Canine and Feline Clinical Pathology. Y Procedures in Small Animal Practice 33 Blood smear preparation Indications/Use B • Assessment of: – Leucocyte (WBC) differential count – Leucocyte abnormalities, e.g. toxic neutrophils, left shift, blast D',
  NULL,
  NULL,
  'These are very uncommon but may include: • Minor haemorrhage T • Subcutaneous haematoma formation • Vascular trauma U • Thrombophlebitis For information on interpretation of blood samples W see the BSAVA Manual of Canine and Feline Clinical Pathology. Y Procedures in Small Animal Practice 33 Blood smear preparation Indications/Use B • Assessment of: – Leucocyte (WBC) differential count – Leucocyte abnormalities, e.g. toxic neutrophils, left shift, blast D',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_013',
  'Bone marrow aspiration',
  'B',
  43,
  NULL,
  NULL,
  'H • Blood collected in an EDTA anticoagulant tube (see Blood sampling – (b) venous) I • Microhaematocrit tube • Microscope slides J • A ‘spreader’ slide: this is narrower than the smear slide to avoid spreading the cells over the edge of the slide. ‘Spreaders’ can be K made by breaking the corner off a normal slide, having first scored it with a blade or diamond writer L Technique M 1. Using a microhaematocrit tube, place a drop of well mixed blood in the centre line toward one end of a microscope slide. P 2. Hold the ‘spreader’ between the thumb and middle finger, Q placing the index finger on top of the ‘spreader’. R 3. Place the ‘spreader’ in front of the blood spot, at an angle of S about 30 degrees, and draw it backwards until it comes into T contact with the blood, allowing the blood to spread U out rapidly along the edge of the ‘spreadFeearth’.ered edge V 4. The moment this occurs, advance the ‘spreader’ W forwards smoothly and quickly. 5. As the smeFeaarth iesre dm eadgdee, a X ‘feathered edge’ forms. Do not lift the ‘spreader’ slide until the Y feathered edge is complete. Feathered edge 34 Procedures in Small Animal Practice 6. Ideally the smear should extend approximately two-thirds of the length of the slide. 7. Allow the smear to air dry fully before staining with an appropriate stain. Feathered edge Practical tips: common faults and how to avoid them Fault How to avoid Film too thick Use a smaller drop of blood Film too thin Use a larger drop of blood and/or faster spreading',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_014',
  'Bronchoalveolar lavage',
  'B',
  45,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'H Dogs I 1. An assistant should apply pressure at the thoracic inlet to raise the jugular vein. Avoid contamination of the venepuncture site. J 2. Remove the needle cap and perform venepuncture using the 16 G needle attached to the collection bag. If no flashback of K blood is seen in the tubing, check needle placement and tubing for occlusion. The needle may need to be repositioned, but should L not be fully withdrawn from the patient. 3. Position the bag lower than the donor to aid in gravitational flow M and on a set of electronic scales. 4. Periodically invert the bag to ensure adequate mixing of blood and N anticoagulant. 5. The maximum canine donation volume is approximately 16–18 O ml/kg. The volume of blood that should be collected into a commercial blood bag is 450 ml, with an allowable 10% variance P (405–495 ml). The weight of 1 ml of canine blood is approximately 1.053 g; therefore, the weight of an acceptable unit using one of Q these bags is approximately 426–521 g. When the bag is full, clamp the tubing with a pair of artery forceps and remove the R needle from the jugular vein. 6. Using a gauze swab, apply pressure over the venepuncture site for 5 minutes. A light neck bandage should be applied for several hours. 7. Allow the tubing to refill with anticoagulant blood and clamp the distal (needle) end with a hand sealer clip or heat sealer. If these are not available, a knot can be tied in the line, although this is less desirable. 8. Clamp the entire length of tubing into 10 cm segments to be used for cross-matching. 9. Label the bag with the product type, donor identification, date of collection, date of expiration, donor blood type, donor PVC and phlebotomist identification prior to use or storage. 10. Following donation, food and water can be offered. Activity should be restricted to lead walks only for the next 24 hours, and it is advised that a harness or lead passed under the chest is used instead of a neck collar and lead, to avoid pressure on the jugular venepuncture site. Procedures in Small Animal Practice 37',
  NULL,
  'Y • Haematoma • Hypovolaemic shock Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_015',
  'Bronchoscopy',
  'B',
  47,
  'Q • To determine serological compatibility between a patient and donor blood R',
  NULL,
  'A • Approximately 5 ml of blood collected in EDTA anticoagulant from both the donor and recipient B • Centrifuge • 5 ml plain plastic tubes C • 0.9% saline • Pipette D • Microscope slides • Microscope E Patient preparation and positioning: see Blood F sampling – (b) venous G',
  NULL,
  'H 1. Collect blood from the jugular vein of the donor and recipient. Approximately 5 ml of blood from each should be placed into I separate EDTA tubes (see Blood sampling – (b) venous). Alternatively, a sample of anticoagulated blood from the clamped J donor blood tubing can be used. 2. Centrifuge the tubes (usually at 1000 RPM for 5–10 minutes), K remove the supernatants (plasma) and transfer them to clean labelled 5 ml plain tubes (donor and recipient) for later use. L 3. If a centrifuge is not available, allow the EDTA tubes to stand for ≥1 hour until the red blood cells have settled before using the M supernatant. Standard cross-match procedure 1. Wash the red blood cells three times with 0.9% saline and discard the supernatant after each wash. P 2. Resuspend the washed red blood cells to create a 3–5% solution by adding 0.2 ml of red blood cells to 4.8 ml of saline (1 drop of Q red blood cells to 20 drops of saline). 3. For each donor prepare three tubes labelled as major, minor and R recipient control. 4. Add to each tube 1 drop of the appropriate 3–5% red blood cells S and 2 drops of plasma according to the following: a. Major cross-match = donor red blood cells and recipient T',
  'O 1. Wash the red blood cells three times with 0.9% saline and discard the supernatant after each wash. P 2. Resuspend the washed red blood cells to create a 3–5% solution by adding 0.2 ml of red blood cells to 4.8 ml of saline (1 drop of Q red blood cells to 20 drops of saline). 3. For each donor prepare three tubes labelled as major, minor and R recipient control. 4. Add to each tube 1 drop of the appropriate 3–5% red blood cells S and 2 drops of plasma according to the following: a. Major cross-match = donor red blood cells and recipient T',
  NULL,
  'Y • Haematoma • Hypovolaemic shock 38 Procedures in Small Animal Practice',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_016',
  'Buccal mucosal bleeding time',
  'B',
  49,
  '• Dogs: As DEA 1.1 is the most antigenic blood type, it is strongly H advised that the DEA 1.1 status of both the donor and recipient is determined prior to transfusion, or that only DEA 1.1-negative I donors are used • Cats: All donor and recipient cats must be blood typed prior to J transfusion, even in an emergency situation K',
  NULL,
  'A • Approximately 5 ml of blood collected in EDTA anticoagulant from both the donor and recipient B • Centrifuge • 5 ml plain plastic tubes C • 0.9% saline • Pipette D • Microscope slides • Microscope E Patient preparation and positioning: see Blood F sampling – (b) venous G',
  NULL,
  'H 1. Collect blood from the jugular vein of the donor and recipient. Approximately 5 ml of blood from each should be placed into I separate EDTA tubes (see Blood sampling – (b) venous). Alternatively, a sample of anticoagulated blood from the clamped J donor blood tubing can be used. 2. Centrifuge the tubes (usually at 1000 RPM for 5–10 minutes), K remove the supernatants (plasma) and transfer them to clean labelled 5 ml plain tubes (donor and recipient) for later use. L 3. If a centrifuge is not available, allow the EDTA tubes to stand for ≥1 hour until the red blood cells have settled before using the M supernatant. Standard cross-match procedure 1. Wash the red blood cells three times with 0.9% saline and discard the supernatant after each wash. P 2. Resuspend the washed red blood cells to create a 3–5% solution by adding 0.2 ml of red blood cells to 4.8 ml of saline (1 drop of Q red blood cells to 20 drops of saline). 3. For each donor prepare three tubes labelled as major, minor and R recipient control. 4. Add to each tube 1 drop of the appropriate 3–5% red blood cells S and 2 drops of plasma according to the following: a. Major cross-match = donor red blood cells and recipient T',
  'O 1. Wash the red blood cells three times with 0.9% saline and discard the supernatant after each wash. P 2. Resuspend the washed red blood cells to create a 3–5% solution by adding 0.2 ml of red blood cells to 4.8 ml of saline (1 drop of Q red blood cells to 20 drops of saline). 3. For each donor prepare three tubes labelled as major, minor and R recipient control. 4. Add to each tube 1 drop of the appropriate 3–5% red blood cells S and 2 drops of plasma according to the following: a. Major cross-match = donor red blood cells and recipient T',
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_017',
  'Cardiopulmonary–cerebral resuscitation',
  'C',
  50,
  '• Dogs: As DEA 1.1 is the most antigenic blood type, it is strongly H advised that the DEA 1.1 status of both the donor and recipient is determined prior to transfusion, or that only DEA 1.1-negative I donors are used • Cats: All donor and recipient cats must be blood typed prior to J transfusion, even in an emergency situation K',
  'Q • Administration of non-typed or non-cross-matched blood to a dog that has previously received a blood transfusion R • Administration of non-typed blood to a cat S Equipment As required for Intravenous catheter placement • Whole blood: – Dogs: As a general rule: – DEA 1.1-negative dogs should only receive DEA 1.1-negative blood – DEA 1.1-positive dogs may receive either DEA 1.1-negative or -positive blood – Cats: – Type A cats must only receive type A blood – Type B cats must only receive type B blood – The rarer type AB cats do not possess either alloantibody; they should ideally receive type AB blood, but when this is Z not available type A blood is the next best choice',
  'L • Approximately 2 ml of blood collected into an EDTA tube (see Blood sampling – (b) venous) • Blood typing test kit Patient preparation and positioning: see Blood sampling – (b) venous O P',
  NULL,
  'Use a commercial blood typing test kit and follow manufacturer’s Q instructions. S U W Y 42 Procedures in Small Animal Practice Care should be taken when blood typing severely anaemic dogs and cats. The prozone effect (due to the low number of red blood cells, the quantity of antigen is reduced compared with the amount of antibody in the reagent) may prevent proper agglutination of blood with the reagent. It may be helpful to centrifuge the whole blood sample and remove one drop of the plasma, to increase the relative concentration of red blood cells. The red F blood cells and plasma are then remixed prior to performing the blood typing test. Despite using blood products from a blood-typed H donor, it is still possible for a patient to experience a haemolytic or non-haemolytic transfusion reaction. I Recipient monitoring during and following administration of blood products is essential. K Blood transfusion – (d) giving M Indications/Use • Anaemia due to: – Haemorrhage – Haemolysis – Reduced erythropoiesis P',
  'J An alternative and more rapid, but potentially less accurate, procedure for cross-match analysis involves visualizing the presence K of agglutination on a slide rather than in a tube. L 1. For each donor prepare three slides labelled as major, minor and recipient control. M 2. Place 1 drop of red blood cells and 2 drops of plasma on to each slide according to the following: N a. Major cross-match = donor red blood cells and recipient',
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_018',
  'Cerebrospinal fluid collection',
  'C',
  55,
  NULL,
  'Q • Fracture in the region to be sampled • Coagulopathy R Equipment S • Jamshidi bone biopsy needle: – 12 G for dogs >5 kg – 14 G for dogs <5 kg and U',
  NULL,
  NULL,
  'F 1. Make a small skin incision with a scalpel blade over the site of needle insertion. 2. With the stylet of the Jamshidi needle in place, advance the cannula through the soft tissues until the bone is reached. J Advance the needle L to the bone M 3. Remove the stylet and penetrate the bone cortex with the cannula. 4. Advance the cannula a sufficient distance into the bone (1.5–3 cm). N 5. Vigorously rotate the cannula in one direction and also swiftly move it sideways, to ensure the biopsy sample is sectioned at O its base. 6. Remove the cannula. P 7. Insert the blunt probe retrograde into the tip of the cannula to expel the specimen through the base. R T V X Removing the sample Z Procedures in Small Animal Practice 47 8. Place the specimen into an appropriate collection pot. 9. Repeat the procedure with redirection of the instrument to obtain multiple core samples. 10. The skin incision should be sutured or closed with tissue adhesive. Obtaining multiple',
  NULL,
  NULL,
  'J • It is possible that bacterial or fungal infections may spread into the surrounding soft tissue during bone biopsy • Rarely, bone can be weakened enough for a fracture to occur. This is more likely to happen if multiple samples are taken M Bone marrow aspiration N',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_019',
  'Chest drain placement',
  'C',
  59,
  NULL,
  NULL,
  'W • As for Bronchoscopy • Aspiration/lavage catheter • 500 ml warm 0.9% sterile saline • 5–20 ml syringes • Hypodermic needles: 21 G • Microscope slides • EDTA and sterile plain collection tubes',
  NULL,
  NULL,
  NULL,
  NULL,
  'A • Signifi cant haemorrhage is unlikely. However, in a severely thrombocytopenic patient, prolonged digital pressure should be B applied to the biopsy site • Puncture or laceration of muscles and nerves C • Sciatic nerve damage: this can be avoided during placement of a femoral cannula by walking the needle off the medial edge of the D greater trochanter Details of the cytological evaluation of bone marrow F are given in the BSAVA Manual of Canine and Feline Haematology and Transfusion Medicine and the G BSAVA Manual of Canine and Feline Clinical Pathology. H Bone marrow biopsy see J • Bone marrow aspiration L Bronchoalveolar lavage M N',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_020',
  'Coagulation tests',
  'C',
  62,
  NULL,
  'E • Severe hypoxaemia • Coagulopathy F • Severe cardiac arrhythmia/dysfunction • Partial tracheal obstruction G • Unstable asthma • Pulmonary hypertension H Equipment I • Flexible endoscope: diameter 2.5–5 mm, length 25–80 cm • Endoscopic viewing equipment • Topical anaesthetic • Mouth gag • Swivel T-adaptor • Supplementary oxygen • Foreign body retrieval forceps including basket, rat-toothed, alligator, net and polyp snare-type Patient preparation and positioning • Inhalation anaesthesia is generally recommended, but if the O patient is too small to have an endoscope passed through an endotracheal (ET) tube, intravenous anaesthesia must be used. P Intubation should only be performed if the endoscope can fit easily through the ET tube, allowing for movement of air and the Q endoscope at the same time. A swivel T-adaptor can be used to provide constant gas anaesthesia whilst the endoscope is passed R through the ET tube. • Pre-oxygenation is very helpful, especially when there is S compromised oxygenation. This can be provided through nasal oxygen delivery or a face mask. Supplementary oxygen can also T be delivered through the channel of the endoscope or via a catheter placed alongside the endoscope. Flow volumes of 1–3 litres per minute can be safely used. • Position the patient in sternal recumbency with the head elevated and neck extended. • A mouth gag is essential to keep the mouth open and prevent the patient biting down on to the endoscope in the event of contact with the pharynx stimulating the gag reflex. Z 54 Procedures in Small Animal Practice • Endoscopes should not remain in an airway for longer than 30–50 seconds, as they can interfere with ventilation and could result in hypercapnia and overventilation of the lungs, trauma and bronchospasm. • If oxygen is being delivered through the channel constantly, carbon dioxide can not escape through the same channel. F Technique 1. Spray the larynx with topical anaesthetic to avoid laryngospasm. 2. Advance the endoscope into the larynx and examine this region. 3. If the patient is to be intubated, the proximal trachea should be evaluated prior to intubation. Intubation can be performed after evaluation of the length of the trachea that would otherwise be covered by the ET tube. 4. Centre the endoscope as it is advanced, and take care not to irritate the surface of the trachea with the endoscope. K 5. As the endoscope is advanced, the carina or bifurcation is seen. The patient’s right side is on the operator’s left side; therefore the L right mainstem bronchus will be seen on the left side of the image. The left and right mainstem bronchi branch off crisply with M sharp edges. 6. The right mainstem bronchus is in line with the trachea and N should be examined fi rst. 7. Then pass the endoscope into the left mainstem bronchus. O 8. Evaluate segmental and subsegmental airways on the left and right sides as thoroughly and systematically as possible. P 9. Following bronchoscopy, the patient should remain intubated and allowed to breathe 100% oxygen for 10 minutes. Pulse oximetry Q should be utilized to measure the patient’s oxygenation throughout the recovery from anaesthesia and during the R postoperative procedure. Extra care should be taken when performing bronchoscopy in cats, as their airways are particularly prone to bronchospasm. The procedure should be performed as quickly as possible, with the minimum of trauma. Supplementary oxygen is highly recommended both before and after the procedure, and administration of a bronchodilator should be considered. X Foreign body removal 1. Position the endoscope several centimetres proximal to the foreign body. 2. Pass the retrieval forceps, in the closed position, down the biopsy channel (if there is suffi cient room) or adjacent to the endoscope.',
  '• Topical anaesthetic • Mouth gag • Swivel T-adaptor • Supplementary oxygen • Foreign body retrieval forceps including basket, rat-toothed, alligator, net and polyp snare-type Patient preparation and positioning • Inhalation anaesthesia is generally recommended, but if the O patient is too small to have an endoscope passed through an endotracheal (ET) tube, intravenous anaesthesia must be used. P Intubation should only be performed if the endoscope can fit easily through the ET tube, allowing for movement of air and the Q endoscope at the same time. A swivel T-adaptor can be used to provide constant gas anaesthesia whilst the endoscope is passed R through the ET tube. • Pre-oxygenation is very helpful, especially when there is S compromised oxygenation. This can be provided through nasal oxygen delivery or a face mask. Supplementary oxygen can also T be delivered through the channel of the endoscope or via a catheter placed alongside the endoscope. Flow volumes of 1–3 litres per minute can be safely used. • Position the patient in sternal recumbency with the head elevated and neck extended. • A mouth gag is essential to keep the mouth open and prevent the patient biting down on to the endoscope in the event of contact with the pharynx stimulating the gag reflex. Z 54 Procedures in Small Animal Practice • Endoscopes should not remain in an airway for longer than 30–50 seconds, as they can interfere with ventilation and could result in hypercapnia and overventilation of the lungs, trauma and bronchospasm. • If oxygen is being delivered through the channel constantly, carbon dioxide can not escape through the same channel. F Technique 1. Spray the larynx with topical anaesthetic to avoid laryngospasm. 2. Advance the endoscope into the larynx and examine this region. 3. If the patient is to be intubated, the proximal trachea should be evaluated prior to intubation. Intubation can be performed after evaluation of the length of the trachea that would otherwise be covered by the ET tube. 4. Centre the endoscope as it is advanced, and take care not to irritate the surface of the trachea with the endoscope. K 5. As the endoscope is advanced, the carina or bifurcation is seen. The patient’s right side is on the operator’s left side; therefore the L right mainstem bronchus will be seen on the left side of the image. The left and right mainstem bronchi branch off crisply with M sharp edges. 6. The right mainstem bronchus is in line with the trachea and N should be examined fi rst. 7. Then pass the endoscope into the left mainstem bronchus. O 8. Evaluate segmental and subsegmental airways on the left and right sides as thoroughly and systematically as possible. P 9. Following bronchoscopy, the patient should remain intubated and allowed to breathe 100% oxygen for 10 minutes. Pulse oximetry Q should be utilized to measure the patient’s oxygenation throughout the recovery from anaesthesia and during the R postoperative procedure. Extra care should be taken when performing bronchoscopy in cats, as their airways are particularly prone to bronchospasm. The procedure should be performed as quickly as possible, with the minimum of trauma. Supplementary oxygen is highly recommended both before and after the procedure, and administration of a bronchodilator should be considered. X Foreign body removal 1. Position the endoscope several centimetres proximal to the foreign body. 2. Pass the retrieval forceps, in the closed position, down the biopsy channel (if there is suffi cient room) or adjacent to the endoscope.',
  NULL,
  'C 1. Perform bronchoscopy. 2. Once the lung lobes to be sampled have been selected, pass the D bronchoscope into successively smaller airways until it sits snugly. 3. Pre-draw sterile saline into several syringes. E 4. Instil sterile saline via the endoscope channel: • One bolus of 20 ml is used in dogs >10 kg • One bolus of 10 ml is used in dogs <10 kg and in cats. 5. Gently suck the saline back, using the same channel, into a syringe. 6. Negative pressure during aspiration indicates the need to decrease suction to avoid airway collapse. If necessary the bronchoscope can be repositioned slightly, taking care not to dislodge the tip of the bronchoscope from the airway in which it is wedged. 7. Repeat steps 4 to 6 as necessary. 8. Ideally, at least two lung lobes should be sampled. 9. Alternatively, the procedure can be performed using a lavage catheter passed through the biopsy channel of the endoscope or adjacent to the endoscope. M Performing coupage during the procedure may assist sample retrieval. O Sample handling • Ideally, 40–90% of the fl uid instilled should be retrieved. P • Recovered fl uid is typically slightly turbid, with a foamy layer at the top, representative of surfactant. Q • Submit a portion of the sample in a sterile plain tube for culture. • Place an aliquot in an EDTA tube for cytology. • Fresh air-dried smears of any fl occulent/mucoid material can also be made and submitted to the laboratory for staining (see Fine needle aspiration). Potential complications U • Larynx or airway spasm • Catheter breakage and aspiration of the catheter into the airway V • Worsening of respiratory status due to stress Further information on endoscopic equipment and techniques can be found in the BSAVA Manual of Canine and Feline Endoscopy and Endosurgery. Y Further information on bronchoscopy and its interpretation can be found in the BSAVA Manual of Z Canine and Feline Cardiorespiratory Medicine. Procedures in Small Animal Practice 53',
  'should be performed as quickly as possible, with the minimum of trauma. Supplementary oxygen is highly recommended both before and after the procedure, and administration of a bronchodilator should be considered. X Foreign body removal 1. Position the endoscope several centimetres proximal to the foreign body. 2. Pass the retrieval forceps, in the closed position, down the biopsy channel (if there is suffi cient room) or adjacent to the endoscope.',
  NULL,
  'U • Larynx or airway spasm • Catheter breakage and aspiration of the catheter into the airway V • Worsening of respiratory status due to stress Further information on endoscopic equipment and techniques can be found in the BSAVA Manual of Canine and Feline Endoscopy and Endosurgery. Y Further information on bronchoscopy and its interpretation can be found in the BSAVA Manual of Z Canine and Feline Cardiorespiratory Medicine. Procedures in Small Animal Practice 53',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_021',
  'Cystocentesis',
  'C',
  65,
  NULL,
  '• Thrombocytopenia U • Known primary haemostatic abnormality V',
  'W • Spring-loaded bleeding device (e.g. Simplate) • 2 cm wide gauze bandage • Tissue paper/fi lter paper • Stopwatch or timer Z 56 Procedures in Small Animal Practice Patient preparation and positioning • If possible, the procedure should be performed with the animal B conscious. • Light sedation may be required in fractious dogs and in cats. C • The patient is restrained in lateral or sternal recumbency. D Technique 1. Fold back the patient’s upper lip and hold it in place, either via an E assistant or with a gauze bandage, causing moderate engorgement of the mucosal surface. 2. Position the bleeding device on the buccal mucosa, avoiding any obvious superfi cial vessels. Hold fi rmly but avoid excessive pressure. 3. Depress the trigger on the device to create a small incision in the buccal mucosa and simultaneously start the timer. Remove the bleeding device approximately 1 second after triggering. 4. At 15 seconds, blot the fl ow of blood with fi lter paper placed 1–3 mm below the incision without dislodging the clot. 5. Blot in a similar manner every 15 seconds until blood no longer stains the fi lter paper. 6. Stop the timer when bleeding has ceased. O 7. Record the time from making the incision to P cessation of bleeding. Q Results • In healthy dogs, BMBT is 1.7–3.3 minutes; this can be mildly R prolonged (to 4.2 minutes) in anaesthetized or sedated dogs. • BMBT of healthy anaesthetized cats is <3.3 minutes. S • Prolonged BMBT may indicate thrombocytopenia (<75 x 109/l), thrombopathias (e.g. aspirin-induced), or von Willebrand’s disease. Potential complications Prolonged bleeding can occur (uncommon) but should cease with V continued pressure over the incision site. If it does not, the administration of fresh frozen plasma may be required X Further details on coagulation tests and abnormalities can be found in the BSAVA Manual of Y Canine and Feline Haematology and Transfusion Medicine. Procedures in Small Animal Practice 57 Capillary refi ll time see A • Cardiorespiratory examination C Cardiopulmonary–cerebral D',
  NULL,
  '1. Fold back the patient’s upper lip and hold it in place, either via an E assistant or with a gauze bandage, causing moderate engorgement of the mucosal surface. 2. Position the bleeding device on the buccal mucosa, avoiding any obvious superfi cial vessels. Hold fi rmly but avoid excessive pressure. 3. Depress the trigger on the device to create a small incision in the buccal mucosa and simultaneously start the timer. Remove the bleeding device approximately 1 second after triggering. 4. At 15 seconds, blot the fl ow of blood with fi lter paper placed 1–3 mm below the incision without dislodging the clot. 5. Blot in a similar manner every 15 seconds until blood no longer stains the fi lter paper. 6. Stop the timer when bleeding has ceased. O 7. Record the time from making the incision to P cessation of bleeding. Q Results • In healthy dogs, BMBT is 1.7–3.3 minutes; this can be mildly R prolonged (to 4.2 minutes) in anaesthetized or sedated dogs. • BMBT of healthy anaesthetized cats is <3.3 minutes. S • Prolonged BMBT may indicate thrombocytopenia (<75 x 109/l), thrombopathias (e.g. aspirin-induced), or von Willebrand’s disease. Potential complications Prolonged bleeding can occur (uncommon) but should cease with V continued pressure over the incision site. If it does not, the administration of fresh frozen plasma may be required X Further details on coagulation tests and abnormalities can be found in the BSAVA Manual of Y Canine and Feline Haematology and Transfusion Medicine. Procedures in Small Animal Practice 57 Capillary refi ll time see A • Cardiorespiratory examination C Cardiopulmonary–cerebral D',
  NULL,
  NULL,
  'G • Bronchospasm: the chance of this occurring can be reduced by pre-treatment with terbutaline (0.01 mg/kg s.c. 30 mins prior to the H procedure) • Laryngospasm and coughing I • Hypoxaemia • Haemorrhage (uncommon) J • Infection (rare) • Pneumothorax K Further information on endoscopic equipment and techniques can be found in the BSAVA Manual of M Canine and Feline Endoscopy and Endosurgery. Further information on bronchoscopy and its N interpretation can be found in the BSAVA Manual of Canine and Feline Cardiorespiratory Medicine. O Q Buccal mucosal bleeding time R',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_022',
  'Diagnostic peritoneal lavage',
  'D',
  67,
  NULL,
  NULL,
  NULL,
  NULL,
  'X Phases of basic life support Once the decision to perform CPCR has been made, basic and advanced life support should be initiated as rapidly as possible in a sequential, orderly and predetermined manner. Procedures in Small Animal Practice 59 Basic life support includes: A establishing and maintaining an Airway B controlling Breathing C Circulatory support via the initiation of manual chest compression D Drugs D CARDIOPULMONARY RESUSCITATION NO RESPIRATIONS NO RESPIRATIONS NO RESPIRATIONS STRONG PULSE PRESENT NO PULSE/NO HEARTBEAT SLOW OR WEAK PULSE F Establish airway Establish airway Establish airway Ventilate with oxygen Ventilate with oxygen Ventilate with oxygen (6–12 breaths per minute) (6–12 breaths per minute) H Chest compressions 80–100/min Monitoring I Treat underlying disorders Infuse dopamine to effect (3–10 µg/kg/min) ECG NO ECG Adrenaline 10 µg/kg i.v. FIBRILLATION NO FIBRILLATION Defibrillate M Chest compressions, 100/min N Administer adrenaline ECG and CONTINUOUS EXTERNAL COMPRESSION P TACHYCARDIA NORMAL BRADYCARDIA ASYSTOLE ELECTRO- VENTRICULAR RATE MECHANICAL FIBRILLATION R',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_023',
  'Dystocia – emergency treatment',
  'D',
  69,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_024',
  'Echocardiography',
  'E',
  71,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_025',
  'Electrocardiography',
  'E',
  76,
  '• Successful management of the animal with cardiorespiratory disease depends on accurate anatomical localization of disease and effi cient diagnostic planning • Determination of the history of the complaint, assessment of the pattern of breathing, and careful examination and auscultation will assist in determining the site responsible for generation of cardiorespiratory complaints • Electrocardiography and blood pressure measurement also form part of the assessment G',
  NULL,
  'H • Stethoscope I • Stopwatch or timer J Patient preparation and positioning • Assessment should be performed on the conscious animal. • The patient should be standing if possible; this is particularly important for cardiac auscultation. • Animals should be kept calm throughout the examination. M',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_026',
  'Endotracheal intubation',
  'E',
  81,
  NULL,
  '• Soft tissue swelling K • Athletic or working animals L',
  '• 25 mm wide adhesive tape M • Tongue depressor • Stockinette (not absolutely essential) • Cast padding • Conforming gauze bandage • Resin-impregnated fibreglass cast materials • Outer protective bandage material, e.g. self-adhesive non- adherent bandage or adhesive bandage (optional) Patient preparation and positioning • The animal should be sedated heavily or anaesthetized. • The haircoat should be clipped if it is likely to interfere with cast S application and the limb should be clean and dry. • The animal should be placed in lateral recumbency with the T affected limb uppermost and supported in a weight-bearing position by an assistant. U Technique V 1. Place two strips of adhesive tape (stirrups) on the distal limb on either the dorsal and palmar/plantar surfaces or the medial and lateral surfaces. These stirrups should extend beyond the tip of the toes and should be stuck to each other or to a tongue depressor. The assistant can now maintain the limb elevated away from the body by holding the stirrups. 2. Roll the stockinette up the limb and apply tension to eliminate creases.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_027',
  'Excretory urography',
  'E',
  83,
  NULL,
  '• Soft tissue swelling K • Athletic or working animals L',
  '• 25 mm wide adhesive tape M • Tongue depressor • Stockinette (not absolutely essential) • Cast padding • Conforming gauze bandage • Resin-impregnated fibreglass cast materials • Outer protective bandage material, e.g. self-adhesive non- adherent bandage or adhesive bandage (optional) Patient preparation and positioning • The animal should be sedated heavily or anaesthetized. • The haircoat should be clipped if it is likely to interfere with cast S application and the limb should be clean and dry. • The animal should be placed in lateral recumbency with the T affected limb uppermost and supported in a weight-bearing position by an assistant. U Technique V 1. Place two strips of adhesive tape (stirrups) on the distal limb on either the dorsal and palmar/plantar surfaces or the medial and lateral surfaces. These stirrups should extend beyond the tip of the toes and should be stuck to each other or to a tongue depressor. The assistant can now maintain the limb elevated away from the body by holding the stirrups. 2. Roll the stockinette up the limb and apply tension to eliminate creases. 74 Procedures in Small Animal Practice 3. Beginning distally, apply cast padding in a spiral fashion up the limb, overlapping by 50% on each turn. Two layers are generally indicated. Take particular care to ensure even padding over pressure points. Excessive padding about pressure points should be avoided and consideration should be given to increasing the padding in adjacent depressed regions to create a bandage of even diameter. 4. Apply conforming gauze to compact the cast padding, again overlapping turns by 50%. 5. Follow the manufacturers’ recommendations regarding wetting and handling of the cast material. 6. Apply the cast material over the bandage, again with a 50% overlap on each turn. Two or three layers of cast material are generally needed. Leave a 1–2 cm margin of cast padding exposed proximal to the cast. Increase tension as the cast is applied proximal to the elbow or stifle, to give a snug fit about the muscle masses and to prevent loosening. Do not make indentations in the cast material with fingers. J 7. Once the cast has hardened, an oscillating saw may be used to trim excess casting material proximally and distally to prevent K rubbing and to permit weight bearing, respectively. 8. Roll the stockinette and padding over the proximal edge of the L cast and secure them to the cast with adhesive tape. 9. Peel apart the stirrups, twist them through 180 degrees and stick M them to the distal cast. The pads and nails of the axial digits should remain exposed. N 10. Medication with non-steroidal anti-inflammatory drugs is useful to limit soft tissue swelling and to provide analgesia. The requirement O for ongoing treatment should be reassessed after 3–5 days. P Additional/Alternative techniques The cast may be cut along its lateral and medial aspects with an oscillating saw and then bandaged together with strong adhesive tape. This facilitates removal and replacement of the cast to check for problems, but will affect some of the material properties of the cast and is not recommended by some surgeons. Cast maintenance • Written instructions should always be given out at discharge and U owners must understand their responsibility in cast maintenance. • Casts should be checked every 4 hours for the first 24 hours and V then weekly by a veterinary surgeon; rapidly growing dogs and other high-risk patients may require more frequent assessment. W • Animals with a cast should have restricted exercise levels. • The cast must be kept clean and dry. A plastic bag may be placed X over the foot while the dog is walking outside. The plastic bag should be removed when the dog is indoors. Y • Points to monitor for are: – Swelling of the toes or proximal limb Z – Toe discoloration and coolness Procedures in Small Animal Practice 75 – Skin abrasion about the toes or proximal cast – Cast loosening – Angular deformity – Cast damage or breakage – Discharge or foul odour – Chewing at the cast – Deterioration in weight-bearing function – Signs of general ill health (inappetence, dullness, etc.). These signs should prompt cast removal, assessment and replacement only if appropriate. Potential complications • Venous stasis • Limb oedema H • Moist dermatitis • Skin maceration under a wet bandage I • Wound contamination • Pressure necrosis J • Pressure sores • Cast loosening K • Deterioration in fracture apposition • Fracture non-union, malunion or delayed union L • Joint stiffness or laxity • Complications may occur more frequently in growing animals, M chondrodystrophic breeds and obese dogs Cast removal • The timing of cast removal should be aided by radiography. In most instances radiographic evidence of bridging callus formation across P fracture sites or arthrodesis sites is desired prior to cast removal. • Although plaster shears can be used to remove most casting Q materials, an oscillating circular saw is more suitable. • Bilateral incisions are made in the cast, taking care not to damage R underlying tissue. The two halves are then prised apart using cast spreaders if available, and the underlying bandage materials are S removed. • After cast removal it is important that a regimen of progressively T increasing controlled exercise is enforced. The goal is stimulation of callus remodelling without jeopardizing fracture/arthrodesis repair. U Catheterization see • Intravenous catheter placement W • Urethral catheterization Y Central line placement see • Intravenous catheter placement – (b) jugular vein Z',
  NULL,
  NULL,
  NULL,
  NULL,
  'G • Venous stasis • Limb oedema H • Moist dermatitis • Skin maceration under a wet bandage I • Wound contamination • Pressure necrosis J • Pressure sores • Cast loosening K • Deterioration in fracture apposition • Fracture non-union, malunion or delayed union L • Joint stiffness or laxity • Complications may occur more frequently in growing animals, M chondrodystrophic breeds and obese dogs Cast removal • The timing of cast removal should be aided by radiography. In most instances radiographic evidence of bridging callus formation across P fracture sites or arthrodesis sites is desired prior to cast removal. • Although plaster shears can be used to remove most casting Q materials, an oscillating circular saw is more suitable. • Bilateral incisions are made in the cast, taking care not to damage R underlying tissue. The two halves are then prised apart using cast spreaders if available, and the underlying bandage materials are S removed. • After cast removal it is important that a regimen of progressively T increasing controlled exercise is enforced. The goal is stimulation of callus remodelling without jeopardizing fracture/arthrodesis repair. U Catheterization see • Intravenous catheter placement W • Urethral catheterization Y Central line placement see • Intravenous catheter placement – (b) jugular vein Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_028',
  'Fine needle aspiration',
  'F',
  86,
  NULL,
  'N • Suspected increased intracranial pressure (e.g. progressive obtundation; papilloedema; miosis with responsive pupillary light O reflex; intermittent extensor rigidity with opisthotonos) • Suspected active intracranial haemorrhage or haemorrhagic P diathesis • Atlantoaxial luxation or other causes of cervical vertebral Q instability • Infection of the soft tissues overlying the puncture site R • Evidence of very large intracranial space-occupying masses • Severe hydrocephalus or severe cerebral oedema on MRI S',
  'T • As required for Aseptic preparation – (b) non-surgical',
  NULL,
  '1. Palpate a triangle of landmarks formed by the occipital O protuberance and the most prominent points of the lateral wings of the atlas. P 2. The location for needle insertion is on the dorsal midline, halfway between the wings of atlas and the occipital protuberance. Q S U V X Z Needle insertion site (X). A = atlas. B = occipital protuberance 78 Procedures in Small Animal Practice Caution should be employed with Cavalier King Charles Spaniels. Numbers of this breed are affected with Chiari-like malformations, and sampling from the cerebellomedullary cistern may lead to needle penetration of the cerebellum and brainstem. It is therefore advisable to obtain a lumbar cistern sample unless there is MRI evidence to show that the cerebellum is not caudally displaced. 3. Insert the spinal needle, with the bevel facing caudally, parallel to the table surface and parallel to the nose. 4. Once the skin is penetrated, remove the stylet. 5. Advance the needle very slowly (1–2 mm at a time) whilst watching for CSF appearing in the hub. If the needle hits bone while being advanced, it may be redirected cranially or caudally, moving the needle off the bone until the subarachnoid space is penetrated. 6. When the subarachnoid space has been entered, CSF will appear in the needle hub. If blood is seen in the needle hub, entry into a local blood vessel is likely and the sample will be less useful for cytological evaluation. Remove the needle and make a fresh attempt with a new needle. 7. Collect CSF by allowing it to drip passively from the hub into collecting vessels. Suction with a syringe should not be applied, as N this usually results in haemorrhagic contamination of the sample. P R T V X 8. When a minimum of 0.5 ml CSF has been collected, withdraw the Y needle in a single motion. Z',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_029',
  'Gastric lavage',
  'G',
  88,
  NULL,
  'A • Suspected increased intracranial pressure (e.g. progressive B obtundation; papilloedema; miosis with responsive pupillary light reflex; intermittent extensor rigidity with opisthotonos) C • Suspected active intracranial haemorrhage or haemorrhagic',
  'As for Cerebrospinal fluid sampling – (a) cerebellomedullary H',
  NULL,
  '1. The needle is positioned on the midline, just cranial to the appropriate vertebral spinous process, at an angle T of 45 degrees to the L5 L7 skin, with the bevel U facing caudally. W Y L5 L7',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_030',
  'Gastrostomy tube placement – percutaneous endoscopic',
  'G',
  90,
  'M • To diagnose partial or complete rupture of the cranial cruciate ligament (CCL) N • Note: this test does not identify isolated rupture of the caudomedial band of the CCL O • Often used in association with the Tibial compression test P Contraindications Periarticular fi brosis and meniscal injury, with the caudal horn of the Q medial meniscus wedged between the femoral condyle and tibial plateau, may prevent cranial draw in a CCL-defi cient stifl e Patient preparation and positioning • Can be performed in the conscious animal. However, if the patient T is tense (due to pain or temperament) or if the CCL is only partially torn, sedation or general anaesthesia may be required. U • A conscious patient may be restrained in a standing position on three legs, with the affected limb held off the ground. V • Sedated or anaesthetized patients may be positioned in lateral recumbency, with the affected limb uppermost. W',
  'A • Suspected increased intracranial pressure (e.g. progressive B obtundation; papilloedema; miosis with responsive pupillary light reflex; intermittent extensor rigidity with opisthotonos) C • Suspected active intracranial haemorrhage or haemorrhagic',
  'As for Cerebrospinal fluid sampling – (a) cerebellomedullary H',
  NULL,
  '1. The needle is positioned on the midline, just cranial to the appropriate vertebral spinous process, at an angle T of 45 degrees to the L5 L7 skin, with the bevel U facing caudally. W Y L5 L7 Procedures in Small Animal Practice 81 2. Once the skin is penetrated, advance the needle very slowly (1–2 mm at a time). The stylet may be left within the spinal needle. 3. When correctly positioned, the needle typically passes through or alongside the cauda equina/caudal spinal cord, which often elicits a tail or leg twitch. 4. Remove the stylet. 5. When the subarachnoid space has been entered, CSF will appear in the needle hub. If blood emerges from the needle hub, entry into a local blood vessel is likely and the sample will be less useful for cytological evaluation. Remove the needle and make a fresh attempt with a new needle. 6. Collect CSF by allowing it to drip passively from the hub into collecting vessels. Suction with a syringe should not be applied, as this usually results in haemorrhagic contamination of the sample. 7. When a minimum of 0.5 ml CSF has been collected, withdraw the needle in a single motion. Sample handling As for Cerebrospinal fl uid sampling – (a) cerebellomedullary K cistern. Potential complications • Cerebral and/or cerebellar herniation due to intracranial pressure',
  NULL,
  NULL,
  'M • Cerebral and/or cerebellar herniation due to intracranial pressure',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_031',
  'Intraosseous cannula placement',
  'I',
  92,
  'M • To diagnose partial or complete rupture of the cranial cruciate ligament (CCL) N • Note: this test does not identify isolated rupture of the caudomedial band of the CCL O • Often used in association with the Tibial compression test P Contraindications Periarticular fi brosis and meniscal injury, with the caudal horn of the Q medial meniscus wedged between the femoral condyle and tibial plateau, may prevent cranial draw in a CCL-defi cient stifl e Patient preparation and positioning • Can be performed in the conscious animal. However, if the patient T is tense (due to pain or temperament) or if the CCL is only partially torn, sedation or general anaesthesia may be required. U • A conscious patient may be restrained in a standing position on three legs, with the affected limb held off the ground. V • Sedated or anaesthetized patients may be positioned in lateral recumbency, with the affected limb uppermost. W',
  'Periarticular fi brosis and meniscal injury, with the caudal horn of the Q medial meniscus wedged between the femoral condyle and tibial plateau, may prevent cranial draw in a CCL-defi cient stifl e Patient preparation and positioning • Can be performed in the conscious animal. However, if the patient T is tense (due to pain or temperament) or if the CCL is only partially torn, sedation or general anaesthesia may be required. U • A conscious patient may be restrained in a standing position on three legs, with the affected limb held off the ground. V • Sedated or anaesthetized patients may be positioned in lateral recumbency, with the affected limb uppermost. W',
  'A • As required for Aseptic preparation – (a) non-surgical B procedures • Hypodermic needles: C – Dogs: 21–23 G, 1–2 inch – Cats: 23 G, 1–2 inch D • 5 or 10 ml syringe • Sterile plain collection tube capable of holding at least 5 ml fluid E • Container with boric acid preservative F Patient preparation and positioning • Cystocentesis can usually be performed with the patient under physical restraint or light sedation. • In cats and small dogs, it is most readily performed with the animal in dorsal recumbency. • In larger dogs, it may be performed with the animal standing or in lateral recumbency. • Aseptic preparation – (a) non-surgical procedures is perfomed over the appropriate area. PRACTICAL TIP L The bladder must contain a reasonable volume of urine, such that it can be safely identified and immobilized. If a small M volume of urine is present or the animal is obese, ultrasonography may be used to help guide the needle into N the bladder. O',
  NULL,
  'X 1. Grasp the distal femur in one hand, placing the thumb over the lateral fabella and the index fi nger on the patella. 2. Use the other hand to grasp the proximal tibia, placing the thumb over the head of the fabella and the index fi nger on the tibial crest. Procedures in Small Animal Practice 83 3. Apply a cranial force to the tibia while the stifl e joint is held in full extension, and then while the joint is held in 30–60 degrees of fl exion. D F Results H • Complete rupture of the CCL is associated with cranial displacement of the tibia relative to the femur, in both extension and fl exion. • Isolated rupture of the craniomedial band of the CCL is associated with cranial displacement of the tibia relative to the femur, in fl exion only. • A short cranial draw motion, with a sharp end point, may be detected in young animals and is normal. More detail on this procedure and interpretation of N the results can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. O CSF tap see • Cerebrospinal fl uid sampling S',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_032',
  'Intravenous catheter placement',
  'I',
  94,
  'C • Aid to the diagnosis of hyperadrenocorticism: reliably identifi es the D majority of adrenal-dependent cases and 90–95% of dogs with pituitary-dependent hyperadrenocorticism E',
  NULL,
  'A • As required for Aseptic preparation – (a) non-surgical B procedures • Hypodermic needles: C – Dogs: 21–23 G, 1–2 inch – Cats: 23 G, 1–2 inch D • 5 or 10 ml syringe • Sterile plain collection tube capable of holding at least 5 ml fluid E • Container with boric acid preservative F Patient preparation and positioning • Cystocentesis can usually be performed with the patient under physical restraint or light sedation. • In cats and small dogs, it is most readily performed with the animal in dorsal recumbency. • In larger dogs, it may be performed with the animal standing or in lateral recumbency. • Aseptic preparation – (a) non-surgical procedures is perfomed over the appropriate area. PRACTICAL TIP L The bladder must contain a reasonable volume of urine, such that it can be safely identified and immobilized. If a small M volume of urine is present or the animal is obese, ultrasonography may be used to help guide the needle into N the bladder. O',
  NULL,
  'P 1. With one hand palpate and stabilize the bladder by pushing it in a caudal direction against the pelvic brim. 2. Attach the needle to a 5 or 10 ml syringe and insert through the abdominal wall, on the midline, just in front of the pelvic brim. 3. The ideal site of bladder penetration is a short distance T cranial to the junction of the bladder with the U urethra. Insert the needle in a caudal V direction, at a 45-degree angle to W the bladder wall if possible. Slight X negative pressure should be applied to Y the syringe while inserting the needle. Dorsal recumbency Procedures in Small Animal Practice 85 Alternatively, in the standing dog, the sample can be obtained from the right side (to avoid penetrating the descending colon), while gently pushing the bladder from the left side towards the right side of the caudal abdomen. F H 4. Once the bladder lumen is penetrated, urine will be seen filling the syringe. I 5. Once sufficient urine is collected to perform the required diagnostic tests (usually a minimum of 2 ml), remove the needle in J one motion. Sample handling • Urine should be placed into a sterile plain tube for bacterial culture. Fresh urine should be cultured within 2 hours or may be refrigerated for up to 6 hours. Urine samples in boric acid preservative will keep for up to 72 hours. • A separate sample in a plain tube can be used for urinalysis. Potential complications • Bladder rupture is rare but more likely if the bladder is diseased or P the animal is not adequately restrained • Uroperitoneum, following urine leaking from the needle site Q S U W Y 86 Procedures in Small Animal Practice Dexamethasone suppression test – (a) low dose Indications/use • Aid to the diagnosis of hyperadrenocorticism: reliably identifi es the D majority of adrenal-dependent cases and 90–95% of dogs with pituitary-dependent hyperadrenocorticism E',
  NULL,
  NULL,
  '• Bladder rupture is rare but more likely if the bladder is diseased or P the animal is not adequately restrained • Uroperitoneum, following urine leaking from the needle site Q S U W Y 86 Procedures in Small Animal Practice Dexamethasone suppression test – (a) low dose Indications/use • Aid to the diagnosis of hyperadrenocorticism: reliably identifi es the D majority of adrenal-dependent cases and 90–95% of dogs with pituitary-dependent hyperadrenocorticism E',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_033',
  'Intravenous urography',
  'I',
  97,
  'C • Although no longer considered reliable, may be indicated in cases where the diagnosis of canine hyperadrenocorticism has been D established by a screening test, but the differentiation of adrenal- dependent and pituitary-dependent hyperadrenocorticism has not E been determined by ACTH measurement or diagnostic imaging • Also used to aid diagnosis of feline hyperadrenocorticism, F especially when combined with an ACTH response test G',
  'E • Severe coagulopathy F • Marked distension of an abdominal viscus • Marked organomegaly G • Suspected abdominal neoplasia H Equipment • As required for Aseptic preparation – (a) non-surgical procedures I • A large bore 10–14 G over-the-needle catheter. The cannula can be fenestrated whilst on the metal stylet: J – Use V-shaped incisions to create fenestrations in a spiral pattern around the catheter K – Do not make fenestrations directly opposite each other (which would weaken the catheter) L – No burrs must remain, as this could impair entry and exit of the catheter M – Holes should not extend beyond 50% of the circumference of the catheter to avoid risk of breakage N • Local anaesthetic • No. 11 or 15 scalpel • 500 ml pre-warmed (to approximately 37°C) 0.9% sterile saline or lactated Ringer’s solution (Hartmann’s) • Extension tubing • 3-way tap • 60 ml syringes • 2 ml syringe • EDTA and sterile plain collection tubes • Microscope slides Patient preparation and positioning • In most cases, sedation is not needed and the patient is restrained manually in order to minimize movement and avoid accidental bowel puncture. • The patient is restrained in lateral recumbency. • Aseptic preparation – (a) non-surgical procedures is carried out on an area approximately 10 cm x 10 cm, centred on the umbilicus, and a fenestrated drape placed. X Technique 1. The site for diagnostic peritoneal lavage is a point approximately 1 cm below the midline and 1–2 cm caudal to the umbilicus. The skin and subcutaneous tissue may be infiltrated with local anaesthetic, if required. Procedures in Small Animal Practice 89 2. Using a scalpel, make a small stab incision through the skin. 3. Introduce the fenestrated catheter and aim it caudally towards the pelvis. Once the abdominal wall is penetrated, remove the stylet, leaving the cannula in place. 4. Attach a 3-way tap and extension tubing. 5. Infuse warm saline into the abdomen via gravity fl ow or gentle injection. A total volume of 20 ml/kg bodyweight is infused. 6. Gently roll the animal from side to side to distribute the fl uid, preferably with the catheter still in situ. 7. Remove the 3-way tap and allow the fl uid to drain into the collection tubes. 8. If no fl uid is obtained, attempt gentle aspiration with a 2 ml syringe. Note: Only a very small portion of the infused volume will be retrieved (usually only 1–2 ml); any remaining fl uid will be absorbed across the peritoneal membrane. Sample handling I • Place fl uid in an EDTA tube for cytology. Note that a total nucleated cell count can not be performed, as the dilution factor is J unknown. • Place fl uid in a plain tube for total protein measurement and other K biochemical/serological tests. • A sample in a sterile plain tube can be submitted for L bacteriological culture if necessary. • Make several fresh air-dried smears (unstained). M Potential complications • If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z',
  'H As for Dexamethasone suppression test – (a) low dose Patient preparation and positioning As for Dexamethasone suppression test – (a) low dose. J Technique K 1. Collect a blood sample (approximately 2 ml) from the jugular vein and place it into a heparin or plain tube to enable measurement of the basal cortisol concentration. 2. Inject 0.1 mg/kg of dexamethasone into the cephalic vein. When dealing with a very small dose of dexamethasone, it is preferable to place an intravenous catheter to ensure that O the entire dose is administered. 3. After 3 hours, collect a blood sample (approximately 2 ml) from Q the jugular vein and place into a heparin or plain tube. Label the tube clearly as the +3 hours sample. R 4. After 8 hours, collect a further blood sample (approximately 2 ml) from the jugular vein and place into a heparin or plain tube. Label S the tube clearly as the +8 hours sample. 5. Separate the serum or plasma prior to sending the samples to the T laboratory. V For interpretation of results see the BSAVA Manual of Canine and Feline Endocrinology. X Z 88 Procedures in Small Animal Practice Diagnostic peritoneal lavage Indications/Use • Where abdominocentesis has not yielded fluid, but suspicion for C the presence of abdominal fluid or inflammation remains high • It should only be performed after repeat abdominocentesis or D ultrasound-guided aspiration',
  NULL,
  '1. The site for diagnostic peritoneal lavage is a point approximately 1 cm below the midline and 1–2 cm caudal to the umbilicus. The skin and subcutaneous tissue may be infiltrated with local anaesthetic, if required. Procedures in Small Animal Practice 89 2. Using a scalpel, make a small stab incision through the skin. 3. Introduce the fenestrated catheter and aim it caudally towards the pelvis. Once the abdominal wall is penetrated, remove the stylet, leaving the cannula in place. 4. Attach a 3-way tap and extension tubing. 5. Infuse warm saline into the abdomen via gravity fl ow or gentle injection. A total volume of 20 ml/kg bodyweight is infused. 6. Gently roll the animal from side to side to distribute the fl uid, preferably with the catheter still in situ. 7. Remove the 3-way tap and allow the fl uid to drain into the collection tubes. 8. If no fl uid is obtained, attempt gentle aspiration with a 2 ml syringe. Note: Only a very small portion of the infused volume will be retrieved (usually only 1–2 ml); any remaining fl uid will be absorbed across the peritoneal membrane. Sample handling I • Place fl uid in an EDTA tube for cytology. Note that a total nucleated cell count can not be performed, as the dilution factor is J unknown. • Place fl uid in a plain tube for total protein measurement and other K biochemical/serological tests. • A sample in a sterile plain tube can be submitted for L bacteriological culture if necessary. • Make several fresh air-dried smears (unstained). M Potential complications • If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z',
  NULL,
  NULL,
  '• If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_034',
  'Iodinated contrast media',
  'I',
  98,
  'B • Where abdominocentesis has not yielded fluid, but suspicion for C the presence of abdominal fluid or inflammation remains high • It should only be performed after repeat abdominocentesis or D ultrasound-guided aspiration',
  'E • Severe coagulopathy F • Marked distension of an abdominal viscus • Marked organomegaly G • Suspected abdominal neoplasia H Equipment • As required for Aseptic preparation – (a) non-surgical procedures I • A large bore 10–14 G over-the-needle catheter. The cannula can be fenestrated whilst on the metal stylet: J – Use V-shaped incisions to create fenestrations in a spiral pattern around the catheter K – Do not make fenestrations directly opposite each other (which would weaken the catheter) L – No burrs must remain, as this could impair entry and exit of the catheter M – Holes should not extend beyond 50% of the circumference of the catheter to avoid risk of breakage N • Local anaesthetic • No. 11 or 15 scalpel • 500 ml pre-warmed (to approximately 37°C) 0.9% sterile saline or lactated Ringer’s solution (Hartmann’s) • Extension tubing • 3-way tap • 60 ml syringes • 2 ml syringe • EDTA and sterile plain collection tubes • Microscope slides Patient preparation and positioning • In most cases, sedation is not needed and the patient is restrained manually in order to minimize movement and avoid accidental bowel puncture. • The patient is restrained in lateral recumbency. • Aseptic preparation – (a) non-surgical procedures is carried out on an area approximately 10 cm x 10 cm, centred on the umbilicus, and a fenestrated drape placed. X Technique 1. The site for diagnostic peritoneal lavage is a point approximately 1 cm below the midline and 1–2 cm caudal to the umbilicus. The skin and subcutaneous tissue may be infiltrated with local anaesthetic, if required. Procedures in Small Animal Practice 89 2. Using a scalpel, make a small stab incision through the skin. 3. Introduce the fenestrated catheter and aim it caudally towards the pelvis. Once the abdominal wall is penetrated, remove the stylet, leaving the cannula in place. 4. Attach a 3-way tap and extension tubing. 5. Infuse warm saline into the abdomen via gravity fl ow or gentle injection. A total volume of 20 ml/kg bodyweight is infused. 6. Gently roll the animal from side to side to distribute the fl uid, preferably with the catheter still in situ. 7. Remove the 3-way tap and allow the fl uid to drain into the collection tubes. 8. If no fl uid is obtained, attempt gentle aspiration with a 2 ml syringe. Note: Only a very small portion of the infused volume will be retrieved (usually only 1–2 ml); any remaining fl uid will be absorbed across the peritoneal membrane. Sample handling I • Place fl uid in an EDTA tube for cytology. Note that a total nucleated cell count can not be performed, as the dilution factor is J unknown. • Place fl uid in a plain tube for total protein measurement and other K biochemical/serological tests. • A sample in a sterile plain tube can be submitted for L bacteriological culture if necessary. • Make several fresh air-dried smears (unstained). M Potential complications • If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z 90 Procedures in Small Animal Practice A Doppler blood pressure measurement see • Blood pressure measurement – (b) indirect C DPL see D • Diagnostic peritoneal lavage Duodenoscopy see • Endoscopy of the gastrointestinal tract – (a) upper H J L N P R T V X Z',
  '• As required for Aseptic preparation – (a) non-surgical procedures I • A large bore 10–14 G over-the-needle catheter. The cannula can be fenestrated whilst on the metal stylet: J – Use V-shaped incisions to create fenestrations in a spiral pattern around the catheter K – Do not make fenestrations directly opposite each other (which would weaken the catheter) L – No burrs must remain, as this could impair entry and exit of the catheter M – Holes should not extend beyond 50% of the circumference of the catheter to avoid risk of breakage N • Local anaesthetic • No. 11 or 15 scalpel • 500 ml pre-warmed (to approximately 37°C) 0.9% sterile saline or lactated Ringer’s solution (Hartmann’s) • Extension tubing • 3-way tap • 60 ml syringes • 2 ml syringe • EDTA and sterile plain collection tubes • Microscope slides Patient preparation and positioning • In most cases, sedation is not needed and the patient is restrained manually in order to minimize movement and avoid accidental bowel puncture. • The patient is restrained in lateral recumbency. • Aseptic preparation – (a) non-surgical procedures is carried out on an area approximately 10 cm x 10 cm, centred on the umbilicus, and a fenestrated drape placed. X Technique 1. The site for diagnostic peritoneal lavage is a point approximately 1 cm below the midline and 1–2 cm caudal to the umbilicus. The skin and subcutaneous tissue may be infiltrated with local anaesthetic, if required. Procedures in Small Animal Practice 89 2. Using a scalpel, make a small stab incision through the skin. 3. Introduce the fenestrated catheter and aim it caudally towards the pelvis. Once the abdominal wall is penetrated, remove the stylet, leaving the cannula in place. 4. Attach a 3-way tap and extension tubing. 5. Infuse warm saline into the abdomen via gravity fl ow or gentle injection. A total volume of 20 ml/kg bodyweight is infused. 6. Gently roll the animal from side to side to distribute the fl uid, preferably with the catheter still in situ. 7. Remove the 3-way tap and allow the fl uid to drain into the collection tubes. 8. If no fl uid is obtained, attempt gentle aspiration with a 2 ml syringe. Note: Only a very small portion of the infused volume will be retrieved (usually only 1–2 ml); any remaining fl uid will be absorbed across the peritoneal membrane. Sample handling I • Place fl uid in an EDTA tube for cytology. Note that a total nucleated cell count can not be performed, as the dilution factor is J unknown. • Place fl uid in a plain tube for total protein measurement and other K biochemical/serological tests. • A sample in a sterile plain tube can be submitted for L bacteriological culture if necessary. • Make several fresh air-dried smears (unstained). M Potential complications • If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z 90 Procedures in Small Animal Practice A Doppler blood pressure measurement see • Blood pressure measurement – (b) indirect C DPL see D • Diagnostic peritoneal lavage Duodenoscopy see • Endoscopy of the gastrointestinal tract – (a) upper H J L N P R T V X Z',
  NULL,
  '1. The site for diagnostic peritoneal lavage is a point approximately 1 cm below the midline and 1–2 cm caudal to the umbilicus. The skin and subcutaneous tissue may be infiltrated with local anaesthetic, if required. Procedures in Small Animal Practice 89 2. Using a scalpel, make a small stab incision through the skin. 3. Introduce the fenestrated catheter and aim it caudally towards the pelvis. Once the abdominal wall is penetrated, remove the stylet, leaving the cannula in place. 4. Attach a 3-way tap and extension tubing. 5. Infuse warm saline into the abdomen via gravity fl ow or gentle injection. A total volume of 20 ml/kg bodyweight is infused. 6. Gently roll the animal from side to side to distribute the fl uid, preferably with the catheter still in situ. 7. Remove the 3-way tap and allow the fl uid to drain into the collection tubes. 8. If no fl uid is obtained, attempt gentle aspiration with a 2 ml syringe. Note: Only a very small portion of the infused volume will be retrieved (usually only 1–2 ml); any remaining fl uid will be absorbed across the peritoneal membrane. Sample handling I • Place fl uid in an EDTA tube for cytology. Note that a total nucleated cell count can not be performed, as the dilution factor is J unknown. • Place fl uid in a plain tube for total protein measurement and other K biochemical/serological tests. • A sample in a sterile plain tube can be submitted for L bacteriological culture if necessary. • Make several fresh air-dried smears (unstained). M Potential complications • If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z 90 Procedures in Small Animal Practice A Doppler blood pressure measurement see • Blood pressure measurement – (b) indirect C DPL see D • Diagnostic peritoneal lavage Duodenoscopy see • Endoscopy of the gastrointestinal tract – (a) upper H J L N P R T V X Z',
  NULL,
  NULL,
  '• If blood is aspirated, stop. Place the blood in a glass tube and O observe for clot formation. Blood from the abdominal cavity will not clot, whereas blood from a vessel or organ will clot. If bleeding P persists, abdominal pressure should be applied via manual compression or a pressure bandage Q • If fl uid is obtained that suggests that the gastrointestinal tract has been punctured, any hole should seal when the needle is R removed. The patient should, however, be monitored for developing peritonitis S • In some animals with large abdominal effusions, the centesis hole may continue to drain fl uid. If this occurs, a pressure dressing T should be applied for several hours • Extension of localized peritonitis U • Dissemination of neoplastic cells W Details of the cytological evaluation of peritoneal fl uid samples are given in the BSAVA Manual of Canine and Feline Clinical Pathology. Z 90 Procedures in Small Animal Practice A Doppler blood pressure measurement see • Blood pressure measurement – (b) indirect C DPL see D • Diagnostic peritoneal lavage Duodenoscopy see • Endoscopy of the gastrointestinal tract – (a) upper H J L N P R T V X Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_035',
  'Myringotomy',
  'M',
  100,
  '• To support the hip joint following closed reduction of hip joint F luxation (to permit stabilization and healing of the periarticular tissues) G • The Ehmer sling holds the pelvic limb in fl exion, while internally rotating and mildly abducting the hip joint H Contraindications I • Patient’s temperament will not tolerate prolonged immobilization of J',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_036',
  'Nasal oxygen administration',
  'N',
  102,
  '• Traumatic elbow luxation in the adult dog in the absence of T fractures and congenital skeletal deformities • Closed reduction should be attempted as soon as possible before U development of an organized intra-articular haematoma V',
  'W • Elbow luxation associated with fractures and/or avulsion of',
  'Y Radiography equipment 94 Procedures in Small Animal Practice Patient preparation and positioning • General anaesthesia is required. B • Confirm complete traumatic elbow luxation and rule out associated fractures by palpation and radiography. C • The patient is positioned in lateral recumbency with the affected limb uppermost. D',
  NULL,
  'Q Elbow luxation – closed reduction R Indications/Use • Traumatic elbow luxation in the adult dog in the absence of T fractures and congenital skeletal deformities • Closed reduction should be attempted as soon as possible before U development of an organized intra-articular haematoma V',
  NULL,
  NULL,
  'K • If applied too tightly, potential complications include: – Paw swelling due to venous stasis – Irritation of the skin, especially over the medial thigh – Sloughing of the metatarsal pad – Pressure necrosis of the soft tissues • If the sling becomes wet, moist dermatitis and soft tissue maceration may occur • Ehmer sling loosening or slipping over the stifle are frequent O',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_037',
  'Naso-oesophageal tube placement',
  'N',
  103,
  '• Traumatic elbow luxation in the adult dog in the absence of T fractures and congenital skeletal deformities • Closed reduction should be attempted as soon as possible before U development of an organized intra-articular haematoma V',
  'W • Elbow luxation associated with fractures and/or avulsion of',
  'Y Radiography equipment 94 Procedures in Small Animal Practice Patient preparation and positioning • General anaesthesia is required. B • Confirm complete traumatic elbow luxation and rule out associated fractures by palpation and radiography. C • The patient is positioned in lateral recumbency with the affected limb uppermost. D',
  NULL,
  'Q Elbow luxation – closed reduction R Indications/Use • Traumatic elbow luxation in the adult dog in the absence of T fractures and congenital skeletal deformities • Closed reduction should be attempted as soon as possible before U development of an organized intra-articular haematoma V',
  NULL,
  NULL,
  'K • If applied too tightly, potential complications include: – Paw swelling due to venous stasis – Irritation of the skin, especially over the medial thigh – Sloughing of the metatarsal pad – Pressure necrosis of the soft tissues • If the sling becomes wet, moist dermatitis and soft tissue maceration may occur • Ehmer sling loosening or slipping over the stifle are frequent O',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_038',
  'Neurological examination',
  'N',
  105,
  'Q • Evaluation of cardiac anatomical changes, arrhythmias and pericardial and pleural diseases • Evaluation of cardiac therapy • Investigation of exercise intolerance, dyspnoea, coughing, weakness, collapse • Evaluation of trauma cases • Suspected electrolyte abnormality, particularly hyperkalaemia • Monitoring during anaesthesia or in critical care setting Equipment V • Electrocardiograph • Limb leads x4 W • Crocodile clips with teeth fi led down or adhesive ECG pads • Adhesive tape X • ECG gel • 70% surgical spirit Y 96 Procedures in Small Animal Practice Patient preparation and positioning • The animal should be calm and relaxed, before being placed on B a surface that is electrically insulated, such as a rubber mat or thick blanket. C • The conventional position is right lateral recumbency, with the fore- and hindlimbs as perpendicular to the long axis of the body D as is possible. • In dyspnoeic or uncooperative patients, sternal recumbency, E sitting or standing positions are acceptable. Complex amplitude and morphology are more variable in these non-standard F positions, especially in dogs; however, improved patient compliance (in cats) may produce a better quality trace with G fewer artefacts. • Chemical restraint may cause changes in rhythm, but can be used H as a last resort if the alternative is an uninterpretable trace. • It is not necessary to remove hair before the clips are attached. I • Adhesive electrodes are applied directly to the pads without previous preparation. J',
  NULL,
  NULL,
  NULL,
  'K ECG leads • The electrodes may be colour-coded and marked as for human use. They are attached to the limbs as follows: M – RED: marked RA; right forelimb – YELLOW: marked LA; left forelimb N – GREEN: marked LL or F; left hindlimb – BLACK: marked N; right hindlimb. • For routine short ECG, the electrodes are usually attached to the P animal using crocodile clips. The clips are generally placed on the skin overlying bony protuberances, to minimize the effect of Q muscle interference. They are then sprayed with surgical spirit or covered in ECG gel to achieve good electrical conductivity. R • Limb electrodes are usually positioned fairly near to the body to reduce movement artefact, using the relatively hairless areas of S skin just behind both elbows and in front of the left stifle. Hindlimb electrodes may also be attached to the skin overlying the T gastrocnemius tendon. • The neutral electrode may be placed anywhere but is usually U placed in front of the right stifle. • For long-term ECG monitoring, adhesive electrodes stuck on to V the pads are best; adhesive tape ensures that they do not become dislodged. ECG machine controls • Sensitivity control: allows the operator to vary the number of centimetres on the paper that are equivalent to 1 mV. Most traces are recorded at 1 cm/mV, but if the complexes are so tall that they cannot be accommodated, decreasing the sensitivity will give a readable trace. Procedures in Small Animal Practice 97 • Paper speed control: allows the operator to choose how quickly the trace is run, usually either 25 or 50 mm/s. Slow running may be useful to save paper in a long recording if looking for intermittent arrhythmias. The trace should be run at a fast paper speed for an animal with a fast heart rate or tachyarrhythmia. • Filter: allows artefacts to be suppressed, evening out the trace. Its use often causes a marked decrease in the height of the QRS complexes, and this should be taken into account when the trace is interpreted. • Lead selector: manual lead selection is preferred and the operator should select the six frontal plane leads (Lead I, II, III, aVR, aVL and aVF) in turn. G',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_039',
  'Oesophagostomy tube placement',
  'O',
  114,
  'O • To obtain a sample from the airways for cytology and bacteriology • Generally yields samples representative of the trachea and primary or (at best) secondary bronchi, although some material from the lower bronchioles and alveoli may be collected Q • The upper airway of medium-sized and large dogs may R also be sampled by transtracheal wash. • The lower airways of dogs and cats may be sampled S using bronchoalveolar lavage. Contraindications U • Compromised respiratory function V',
  NULL,
  'W • Sterile endotracheal (ET) tube • Male dog urinary catheter (4–6 Fr). The tip of the catheter can be X cut off to remove the side holes, but care must be taken to ensure that the tip is not sharp Y • Topical local anaesthetic spray • Warmed 0.9% sterile saline Z 106 Procedures in Small Animal Practice • 10 ml and 20 ml syringes • 3-way tap • Sterile plain and EDTA collection tubes • Microscope slides Patient preparation and positioning D • General anaesthesia is essential. • The patient is placed in either lateral or sternal recumbency. E',
  NULL,
  'F 1. The urinary catheter will be passed into the trachea through the ET tube. Mark the packaging of the urinary catheter to identify the depth of insertion into the ET tube, which will allow the catheter tip to extend 2–3 inches beyond the distal end of the ET tube. 2. If intubating a cat, apply topical local anaesthetic spray to the larynx. 3. Insert a sterile ET tube into the trachea, avoiding oral contamination. Take care to minimize contact between the tip of the ET tube K and the oropharynx during intubation, to avoid oropharyngeal contamination. 4. Pass the sterile catheter down the ET tube to the pre-marked length. To avoid contamination, the catheter should be inserted by N feeding it through the sterile packaging. 5. Attach a 3-way tap to the catheter. O 6. Inject warmed sterile saline (0.5 ml/kg) into the catheter via the 3-way tap. P 7. Immediately aspirate back the saline. 8. Repeat the injection of saline and the aspiration two or three Q times as required. Coupage and turning the patient may improve cell yield. S Extra care should be taken when performing an endotracheal wash in feline patients as the airways of T cats are particularly prone to bronchospasm. The procedure should be performed as quickly as U possible,with the minimum of trauma. Supplementary oxygen is highly recommended both before and after V the procedure, and administration of a bronchodilator should be considered. X Sample handling • Submit a portion of the sample in a sterile plain tube for culture. Y • Place an aliquot in an EDTA tube for cytology. • Fresh air-dried smears of any fl occulent/mucoid material can also be made and submitted to the laboratory for cytology.',
  NULL,
  NULL,
  'G • Haemorrhage (rare) • Perforation (rare) H Further information on endoscopy of the gastrointestinal tract can be found in the BSAVA J Manual of Canine and Feline Endoscopy and Endosurgery. K M Endotracheal wash Indications/Use • To obtain a sample from the airways for cytology and bacteriology • Generally yields samples representative of the trachea and primary or (at best) secondary bronchi, although some material from the lower bronchioles and alveoli may be collected Q • The upper airway of medium-sized and large dogs may R also be sampled by transtracheal wash. • The lower airways of dogs and cats may be sampled S using bronchoalveolar lavage. Contraindications U • Compromised respiratory function V',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_040',
  'Ophthalmic examination',
  'O',
  116,
  '• To obtain a sample for cytology from soft tissue masses or abdominal viscera D',
  'E • Coagulopathy F Equipment • As required for Aseptic preparation – (a) non-surgical G',
  '• As required for Aseptic preparation – (a) non-surgical G',
  NULL,
  'F 1. The urinary catheter will be passed into the trachea through the ET tube. Mark the packaging of the urinary catheter to identify the depth of insertion into the ET tube, which will allow the catheter tip to extend 2–3 inches beyond the distal end of the ET tube. 2. If intubating a cat, apply topical local anaesthetic spray to the larynx. 3. Insert a sterile ET tube into the trachea, avoiding oral contamination. Take care to minimize contact between the tip of the ET tube K and the oropharynx during intubation, to avoid oropharyngeal contamination. 4. Pass the sterile catheter down the ET tube to the pre-marked length. To avoid contamination, the catheter should be inserted by N feeding it through the sterile packaging. 5. Attach a 3-way tap to the catheter. O 6. Inject warmed sterile saline (0.5 ml/kg) into the catheter via the 3-way tap. P 7. Immediately aspirate back the saline. 8. Repeat the injection of saline and the aspiration two or three Q times as required. Coupage and turning the patient may improve cell yield. S Extra care should be taken when performing an endotracheal wash in feline patients as the airways of T cats are particularly prone to bronchospasm. The procedure should be performed as quickly as U possible,with the minimum of trauma. Supplementary oxygen is highly recommended both before and after V the procedure, and administration of a bronchodilator should be considered. X Sample handling • Submit a portion of the sample in a sterile plain tube for culture. Y • Place an aliquot in an EDTA tube for cytology. • Fresh air-dried smears of any fl occulent/mucoid material can also be made and submitted to the laboratory for cytology. Procedures in Small Animal Practice 107 Potential complications • Larynx or airway spasm • Catheter breakage and aspiration of the catheter into the airway B • Worsening of respiratory status due to stress of the procedure Details on cytology of upper respiratory tract samples D can be found in the BSAVA Manual of Canine and Feline Clinical Pathology. E Epilepsy see G • Seizures – emergency protocol I K M O Q S U W Y 108 Procedures in Small Animal Practice Fine needle aspiration B Indications/Use • To obtain a sample for cytology from soft tissue masses or abdominal viscera D',
  'C Details on cytology of upper respiratory tract samples D can be found in the BSAVA Manual of Canine and Feline Clinical Pathology. E Epilepsy see G • Seizures – emergency protocol I K M O Q S U W Y 108 Procedures in Small Animal Practice Fine needle aspiration B Indications/Use • To obtain a sample for cytology from soft tissue masses or abdominal viscera D',
  NULL,
  'A • Larynx or airway spasm • Catheter breakage and aspiration of the catheter into the airway B • Worsening of respiratory status due to stress of the procedure Details on cytology of upper respiratory tract samples D can be found in the BSAVA Manual of Canine and Feline Clinical Pathology. E Epilepsy see G • Seizures – emergency protocol I K M O Q S U W Y 108 Procedures in Small Animal Practice Fine needle aspiration B Indications/Use • To obtain a sample for cytology from soft tissue masses or abdominal viscera D',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_041',
  'Orthopaedic examination',
  'O',
  122,
  'C • Stabilization of dogs with gastric dilatation and volvulus (GDV) D prior to surgery • Orogastric intubation is superior to percutaneous needle E decompression (see below) Fluid therapy for the treatment of hypovolaemic shock G must be initiated prior to gastric decompression. I',
  '• Gastric outflow obstruction • Chronic vomiting • Comatose, recumbent or dysphoric animals that are at risk of H',
  'J • Wide-bore stomach tube • 7.5 cm wide roll of adhesive bandage with a hollow plastic core K • Funnel • Bucket L • Warmed normal (0.9%) saline, lactated Ringer’s (Hartmann’s) solution or tap water Patient preparation and positioning • Sedation should be avoided, so as not to worsen hypotensive changes. • A right lateral abdominal radiograph should be obtained to confi rm the diagnosis of GDV if there is any doubt. • The patient should be on a table or trolley to allow gravity to aid in gastric emptying. • A ‘sitting’ position or sternal recumbency is often best, but gastric decompression may be achieved in right lateral recumbency. R',
  NULL,
  'S 1. Mark the distance from the dog’s nose to its 11th rib on the T stomach tube. The tube should not be passed beyond this length, to minimize the risk of rupture of a potentially compromised U gastric wall. 2. Insert the bandage roll longitudinally into the dog’s mouth. The V mouth is held closed around the bandage roll by an assistant or by applying tape around the dog’s muzzle. W 3. Insert the stomach tube through the core of the bandage roll and gently down into the dog’s stomach. Rotating the stomach tube X gently about its long axis may aid passage through the gastro- oesophageal junction. Y 4. Gaseous decompression is achieved spontaneously. Procedures in Small Animal Practice 113 5. Further emptying of the stomach can be achieved by lavage with copious volumes of warm saline, lactated Ringer’s or tap water. a. Pour the solution from a height into the stomach, using a funnel attached to the end of the stomach tube. b. Allow stomach contents to fl ow out of the stomach by lowering the tube below the level of the dog. Potential complications • Trauma to the gastro-oesophageal junction E • Passage of the stomach tube through a compromised gastric wall Gastric decompression – G (b) percutaneous needle Indications/Use I • May facilitate orogastric intubation • Should be performed when orogastric intubation (see above) is not possible K',
  NULL,
  NULL,
  '• Trauma to the gastro-oesophageal junction E • Passage of the stomach tube through a compromised gastric wall Gastric decompression – G (b) percutaneous needle Indications/Use I • May facilitate orogastric intubation • Should be performed when orogastric intubation (see above) is not possible K',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_042',
  'Ortolani test',
  'O',
  129,
  '• Confi rmation of suspected immune-mediated haemolytic anaemia C',
  'D • If luxation has been present for longer than 7–10 days, closed reduction is unlikely to be successful E Equipment F • Soft cotton rope or towel sling • Sandbag • As for Ehmer sling Patient preparation and positioning • General anaesthesia is required. • Ventrodorsal and lateral radiographs of the pelvis should be J obtained to confirm hip luxation and to evaluate the direction of the luxation. Radiography is also required to detect avulsion K fractures of the teres ligament, other pelvic fractures and the presence of pre-existing coxofemoral osteoarthritis, which may L complicate management of hip luxation. • The patient should be positioned in lateral recumbency, with the M affected limb uppermost. • For large dogs it may be beneficial to secure their hindquarters to N the table, using a soft cotton rope placed within the inguinal region of the affected limb and secured caudodorsally to the table. O Alternatively, the affected pelvic limb may be supported using a towel sling: the towel is passed through the inguinal region and P both ends are held by an assistant standing on the dorsal side of the patient. Q Technique R Craniodorsal luxation (the majority of cases) S 1. Manipulate the femoral head to loosen any adhesions and apply caudoventral traction to the stifle region to counteract muscle T contraction. 2. Extend the leg, adduct and externally rotate it with continued U traction to lift the femoral head over the dorsal rim of the acetabulum and reduce the hip. The greater trochanter may be V guided caudally and distally with the non-dominant hand. 3. A palpable/audible click may be noted at reduction. Apply W pressure to the trochanter and rotate the joint to express any haematoma from the joint space. X 4. Manipulate the hip and check it for range of motion and stability. 5. Confirm reduction radiographically. Y 6. If appropriate, apply an Ehmer sling for 7–10 days. Z',
  'D • 1 ml of venous blood, freshly collected in an EDTA tube (see E Blood sampling – (a) venous) • Microhaematocrit tube F • Microscope slide and coverslip • 0.9% saline G • 2 ml syringe and needle • Microscope H',
  NULL,
  'I 1. Using a microhaematocrit tube, place 2–4 drops of blood on a microscope slide. 2. Using a syringe and needle, withdraw saline from a bag and add 2–4 drops to the blood on the slide. 3. Rock the slide gently for 1 minute. 4. Examine the slide grossly for agglutination, i.e. clumping of red cells. 5. Add a coverslip and examine microscopically under high power. 6. A positive result is the microscopic visualization of clumps of randomly oriented red blood cells. O It is very important to examine the slide using the microscope, as rouleaux formation appears grossly identical to true agglutination. Q S T Agglutination Rouleau V Further details of the test and its interpretation are given in the BSAVA Manual of Canine and Feline W Clinical Pathology. Y High-dose dexamethasone test see Z • Dexamethasone suppression test – (b) high dose Procedures in Small Animal Practice 121 Hip luxation – closed reduction Indications/Use B • Recent traumatic hip luxation C',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_043',
  'Otoscopy',
  'O',
  130,
  '• Confi rmation of suspected immune-mediated haemolytic anaemia C',
  'D • If luxation has been present for longer than 7–10 days, closed reduction is unlikely to be successful E Equipment F • Soft cotton rope or towel sling • Sandbag • As for Ehmer sling Patient preparation and positioning • General anaesthesia is required. • Ventrodorsal and lateral radiographs of the pelvis should be J obtained to confirm hip luxation and to evaluate the direction of the luxation. Radiography is also required to detect avulsion K fractures of the teres ligament, other pelvic fractures and the presence of pre-existing coxofemoral osteoarthritis, which may L complicate management of hip luxation. • The patient should be positioned in lateral recumbency, with the M affected limb uppermost. • For large dogs it may be beneficial to secure their hindquarters to N the table, using a soft cotton rope placed within the inguinal region of the affected limb and secured caudodorsally to the table. O Alternatively, the affected pelvic limb may be supported using a towel sling: the towel is passed through the inguinal region and P both ends are held by an assistant standing on the dorsal side of the patient. Q Technique R Craniodorsal luxation (the majority of cases) S 1. Manipulate the femoral head to loosen any adhesions and apply caudoventral traction to the stifle region to counteract muscle T contraction. 2. Extend the leg, adduct and externally rotate it with continued U traction to lift the femoral head over the dorsal rim of the acetabulum and reduce the hip. The greater trochanter may be V guided caudally and distally with the non-dominant hand. 3. A palpable/audible click may be noted at reduction. Apply W pressure to the trochanter and rotate the joint to express any haematoma from the joint space. X 4. Manipulate the hip and check it for range of motion and stability. 5. Confirm reduction radiographically. Y 6. If appropriate, apply an Ehmer sling for 7–10 days. 122 Procedures in Small Animal Practice Cranioventral luxation • Manipulate the femoral head to the craniodorsal position and reduce as described above. • Alternatively, it may be possible to manipulate the femoral head directly back into the acetablulum by palpation. • Confi rm reduction radiographically. Caudoventral luxation E • In this instance the femoral head often sits within the obturator foramen. Traction is applied to the affected limb by grasping it F proximal to the stifl e whilst counter-traction is applied to the tuber ischium. This releases the femoral head from the obturator G foramen. • The femoral head is then lifted laterally and cranially into the H acetabulum. This may be aided by placing a sandbag between the thighs: the sandbag is then used as a fulcrum to lever the femoral head back into the acetabulum. • Confi rm reduction radiographically. • An Ehmer sling should not be used in these cases. K',
  'D • 1 ml of venous blood, freshly collected in an EDTA tube (see E Blood sampling – (a) venous) • Microhaematocrit tube F • Microscope slide and coverslip • 0.9% saline G • 2 ml syringe and needle • Microscope H',
  NULL,
  'I 1. Using a microhaematocrit tube, place 2–4 drops of blood on a microscope slide. 2. Using a syringe and needle, withdraw saline from a bag and add 2–4 drops to the blood on the slide. 3. Rock the slide gently for 1 minute. 4. Examine the slide grossly for agglutination, i.e. clumping of red cells. 5. Add a coverslip and examine microscopically under high power. 6. A positive result is the microscopic visualization of clumps of randomly oriented red blood cells. O It is very important to examine the slide using the microscope, as rouleaux formation appears grossly identical to true agglutination. Q S T Agglutination Rouleau V Further details of the test and its interpretation are given in the BSAVA Manual of Canine and Feline W Clinical Pathology. Y High-dose dexamethasone test see Z • Dexamethasone suppression test – (b) high dose Procedures in Small Animal Practice 121 Hip luxation – closed reduction Indications/Use B • Recent traumatic hip luxation C',
  NULL,
  'L • Exercise should be restricted for 3–6 weeks following closed reduction of hip luxation, to allow for healing of the periarticular M tissues. • Appropriate analgesia should be provided. Potential complications • Reluxation of the hip • Hip osteoarthritis • Iatrogenic damage to the cartilage of the femoral head Further information on hip problems and their treatment can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. T V X Z',
  'O • Reluxation of the hip • Hip osteoarthritis • Iatrogenic damage to the cartilage of the femoral head Further information on hip problems and their treatment can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. T V X Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_044',
  'Pericardiocentesis',
  'P',
  132,
  NULL,
  'J • Sites with high risk of bacterial contamination/infection from e.g. local tissue damage, local skin infection, diarrhoea, urinary K',
  'M • As required for Aseptic preparation – (a) non-surgical procedures N • Potential intraosseous cannulas: – Commercially available intraosseous cannulas O – Spinal needle – Bone marrow aspiration needle P – Hypodermic needle (may be able to penetrate the soft cortex of young puppies and kittens) Q Ideally, intraosseous cannulas should have a central stylet to prevent a core of bone from obstructing the cannula R Cannula size should be appropriate for the estimated diameter of the bone marrow canal, size of the point of access into the bone S and proposed fl uid administration rates • No. 11 scalpel T • Local anaesthetic • T-connector or extension set containing heparinized saline (1 IU U of heparin per ml of 0.9% saline) • Sterile non-adherent dressing or swab • Adhesive tape or suture • Soft padded bandage and outer protective bandage Patient preparation and positioning • The animal’s limb must be held still; this can usually be achieved Y by manual restraint but sedation may be required. 124 Procedures in Small Animal Practice • Aseptic preparation – (a) non-surgical procedures should be carried out on a large area of skin surrounding the proposed site of cannula entry. • Possible sites: – The medial aspect of the trochanteric fossa of the',
  NULL,
  'X 1. Infiltrate local anaesthetic down to the level of the periosteum. 2. Make a stab incision in the skin over the proposed entry point into the bone. 3. Insert the cannula through the skin and directly down on to the bone.',
  NULL,
  'L • Exercise should be restricted for 3–6 weeks following closed reduction of hip luxation, to allow for healing of the periarticular M tissues. • Appropriate analgesia should be provided. Potential complications • Reluxation of the hip • Hip osteoarthritis • Iatrogenic damage to the cartilage of the femoral head Further information on hip problems and their treatment can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. T V X Z Procedures in Small Animal Practice 123 Intraosseous cannula placement Indications/Use B • Fluid administration: – Where direct intravenous access is not possible (e.g. hypovolaemic puppies/kittens, severe vascular collapse) – To provide initial fl uid resuscitation and medication until intravenous access is possible • Most substances that can be given intravenously F can be given into the medullary space, and absorption into the vasculature is extremely rapid. G • However, hypertonic and alkaline fl uids may cause pain and lameness. H I',
  'O • Reluxation of the hip • Hip osteoarthritis • Iatrogenic damage to the cartilage of the femoral head Further information on hip problems and their treatment can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. T V X Z Procedures in Small Animal Practice 123 Intraosseous cannula placement Indications/Use B • Fluid administration: – Where direct intravenous access is not possible (e.g. hypovolaemic puppies/kittens, severe vascular collapse) – To provide initial fl uid resuscitation and medication until intravenous access is possible • Most substances that can be given intravenously F can be given into the medullary space, and absorption into the vasculature is extremely rapid. G • However, hypertonic and alkaline fl uids may cause pain and lameness. H I',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_045',
  'Platelet count',
  'P',
  134,
  'X • Intravenous fluid administration • Intravenous drug administration Y • Repeat intravenous blood sampling, although a central line is often preferable for this indication Z 126 Procedures in Small Animal Practice',
  'A • Sites with a high risk of bacterial contamination/infection, e.g. due B to local tissue damage, local skin infection, diarrhoea, urinary',
  'D • Over-the-needle intravenous catheter, comprising a needle (or stylet) with a closely associated catheter fitted over the needle. E Fluid flow rate is related to catheter length and radius. For rapid fluid administration, choose the shortest catheter with the largest F radius that can pass into the vein: – Dogs: usually 22 G (blue), 20 G (pink) or 18 G (green) G – Cats: usually 22 G (blue) – Puppies/Kittens or patients with collapsed veins may require H 24 G (yellow) • No. 11 scalpel I • T-connector or extension set containing heparinized saline (1 IU of heparin per ml of 0.9% saline) or injection cap J • Adhesive tape • Soft padded bandage and outer protective bandage • 4% chlorhexidine gluconate or 10% povidone–iodine • 70% surgical spirit Patient preparation and positioning • An area of skin surrounding the point of vein entry should be clipped. Long hair on the caudal aspect of the limb may need to be removed if it will interfere with securing the catheter, and to O help prevent contamination. In some dogs a complete 360-degree clip of the limb may be necessary. P • Using cotton wool or gauze swabs, the skin over the vein is cleaned with chlorhexidine or povidone–iodine and then sprayed Q with surgical spirit. • Possible sites: R – Cephalic vein and accessory cephalic vein in the distal forelimb (see Blood sampling) S – Medial and lateral saphenous veins in the distal hindlimb (see Blood sampling) T – Auricular veins in breeds with large ears, e.g. Basset Hound – Dorsal common digital vein of the metatarsal bones. U • The animal’s limb must be held still. This can usually be achieved by manual restraint, but sedation may be useful in animals whose V temperament does not permit restraint. W Technique Hands should be washed with an antiseptic solution prior to Y catheter placement. Sterile gloves are not necessary, but the precise point of catheter insertion should not be contaminated Z after aseptic preparation.',
  NULL,
  'X 1. Infiltrate local anaesthetic down to the level of the periosteum. 2. Make a stab incision in the skin over the proposed entry point into the bone. 3. Insert the cannula through the skin and directly down on to the bone. Procedures in Small Animal Practice 125 4. Insert the cannula into the bone, using a firm twisting motion until the cannula has passed through the cortex and a small way into the medullary cavity. Entry into the medullary cavity is detected as a decrease in resistance to cannula insertion into the bone or increased stability of the cannula within the bone. When the cannula is properly seated within the medullary cavity, movement of the cannula will result in the same movement of the bone. 5. Remove the stylet, if present. 6. Flush the cannula with heparinized saline, and attach a T-connector or infusion set. 7. Secure the cannula to the surrounding skin with sutures or tape. 8. Cover the entry site through the skin with a sterile swab or sterile non-adherent dressing. 9. Apply a bandage to the limb to protect the cannula. Care of intraosseous cannulas • Intraosseous cannulas are most often a short-term solution. I • Catheter patency should be maintained by any fluid running through it. If the catheter is not being used continuously, intermittent J flushing with saline or heparinized saline should be performed several times a day (up to every 4 hours), as well as before and K after use. If a catheter becomes blocked it should be removed. • The bandage should be replaced and the cannula examined at L least twice a day, using aseptic technique. • The site of insertion should be monitored for signs of heat, M erythema, swelling, pain or subcutaneous leakage of fluid. If these signs are noted the cannula should be removed. • The cannula should be removed as soon as it is no longer required. Potential complications • Sciatic nerve damage: this can be avoided during placement of a Q femoral cannula, by walking the needle off the medial edge of the greater trochanter R • Growth plate damage in young animals • Cannula displacement S • Subcutaneous leakage of fluids or medications • Infection T Intravenous catheter placement – (a) peripheral veins Indications/Use • Intravenous fluid administration • Intravenous drug administration Y • Repeat intravenous blood sampling, although a central line is often preferable for this indication Z 126 Procedures in Small Animal Practice',
  NULL,
  NULL,
  '• Sciatic nerve damage: this can be avoided during placement of a Q femoral cannula, by walking the needle off the medial edge of the greater trochanter R • Growth plate damage in young animals • Cannula displacement S • Subcutaneous leakage of fluids or medications • Infection T Intravenous catheter placement – (a) peripheral veins Indications/Use • Intravenous fluid administration • Intravenous drug administration Y • Repeat intravenous blood sampling, although a central line is often preferable for this indication Z 126 Procedures in Small Animal Practice',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_046',
  'Prostatic wash',
  'P',
  135,
  'X • Intravenous fluid administration • Intravenous drug administration Y • Repeat intravenous blood sampling, although a central line is often preferable for this indication Z 126 Procedures in Small Animal Practice',
  'A • Sites with a high risk of bacterial contamination/infection, e.g. due B to local tissue damage, local skin infection, diarrhoea, urinary',
  'D • Over-the-needle intravenous catheter, comprising a needle (or stylet) with a closely associated catheter fitted over the needle. E Fluid flow rate is related to catheter length and radius. For rapid fluid administration, choose the shortest catheter with the largest F radius that can pass into the vein: – Dogs: usually 22 G (blue), 20 G (pink) or 18 G (green) G – Cats: usually 22 G (blue) – Puppies/Kittens or patients with collapsed veins may require H 24 G (yellow) • No. 11 scalpel I • T-connector or extension set containing heparinized saline (1 IU of heparin per ml of 0.9% saline) or injection cap J • Adhesive tape • Soft padded bandage and outer protective bandage • 4% chlorhexidine gluconate or 10% povidone–iodine • 70% surgical spirit Patient preparation and positioning • An area of skin surrounding the point of vein entry should be clipped. Long hair on the caudal aspect of the limb may need to be removed if it will interfere with securing the catheter, and to O help prevent contamination. In some dogs a complete 360-degree clip of the limb may be necessary. P • Using cotton wool or gauze swabs, the skin over the vein is cleaned with chlorhexidine or povidone–iodine and then sprayed Q with surgical spirit. • Possible sites: R – Cephalic vein and accessory cephalic vein in the distal forelimb (see Blood sampling) S – Medial and lateral saphenous veins in the distal hindlimb (see Blood sampling) T – Auricular veins in breeds with large ears, e.g. Basset Hound – Dorsal common digital vein of the metatarsal bones. U • The animal’s limb must be held still. This can usually be achieved by manual restraint, but sedation may be useful in animals whose V temperament does not permit restraint. W Technique Hands should be washed with an antiseptic solution prior to Y catheter placement. Sterile gloves are not necessary, but the precise point of catheter insertion should not be contaminated Z after aseptic preparation. Procedures in Small Animal Practice 127 1. The vein is raised by an assistant by placing pressure over the vein proximal to the site of catheter placement. 2. A small cut can be made in the skin over the vein but is not usually required except in dehydrated animals or those with very thick skin. 3. Advance the over-the-needle catheter through the skin into the vein, at an angle of 30–40 degrees, with the bevel of the stylet uppermost. 4. Once blood is visualized in the flash chamber of the catheter, the stylet and catheter are flattened (i.e. the angle between the catheter and the limb is reduced). Then advance the stylet/ catheter unit a small distance further into the vein to ensure that the catheter lies fully within the lumen. 5. Hold the stylet in position while advancing the catheter forward off the stylet and completely into the vein. 6. Remove the stylet. 7. The assistant can now occlude the vein by applying pressure over it at the distal end of the catheter to prevent spillage of blood. 8. Connect a T-connector or extension set containing heparinized J saline or an injection cap to the catheter to close it. 9. Secure the catheter firmly in place with adhesive tape, and cover K with a bandage. Care of peripheral venous catheters • The bandage should be replaced and the catheter examined at M least twice a day. • The site of insertion should be monitored for signs of heat, N erythema, swelling, pain or leakage of fluid. If signs of phlebitis are present the catheter should be removed. O • The leg and foot should be checked for swelling above the catheter site (indicating extravasation of fluid) and swelling of the P toes (indicating the bandage or tape is too tight). Either of these complications necessitates catheter removal. Q • Catheter patency should be maintained by any fluid running through it. If the catheter is not being used continuously, R intermittent flushing with heparinized saline should be performed several times a day (up to every 4 hours) as well as before and S after use. If a catheter becomes blocked it should be removed. • When a catheter is not in use, a sterile injection cap should be T used to close the catheter from the environment. Disconnection of fluid lines should be avoided and only performed when absolutely necessary to reduce contamination of the catheter. Potential complications • Catheter displacement/extravasation of fluids or medications • Phlebitis/thrombophlebitis • Thrombosis/thromboembolism • Infection • Dislodgement of catheter • Air embolism • Exsanguination',
  NULL,
  'X Hands should be washed with an antiseptic solution prior to Y catheter placement. Sterile gloves are not necessary, but the precise point of catheter insertion should not be contaminated Z after aseptic preparation. Procedures in Small Animal Practice 127 1. The vein is raised by an assistant by placing pressure over the vein proximal to the site of catheter placement. 2. A small cut can be made in the skin over the vein but is not usually required except in dehydrated animals or those with very thick skin. 3. Advance the over-the-needle catheter through the skin into the vein, at an angle of 30–40 degrees, with the bevel of the stylet uppermost. 4. Once blood is visualized in the flash chamber of the catheter, the stylet and catheter are flattened (i.e. the angle between the catheter and the limb is reduced). Then advance the stylet/ catheter unit a small distance further into the vein to ensure that the catheter lies fully within the lumen. 5. Hold the stylet in position while advancing the catheter forward off the stylet and completely into the vein. 6. Remove the stylet. 7. The assistant can now occlude the vein by applying pressure over it at the distal end of the catheter to prevent spillage of blood. 8. Connect a T-connector or extension set containing heparinized J saline or an injection cap to the catheter to close it. 9. Secure the catheter firmly in place with adhesive tape, and cover K with a bandage. Care of peripheral venous catheters • The bandage should be replaced and the catheter examined at M least twice a day. • The site of insertion should be monitored for signs of heat, N erythema, swelling, pain or leakage of fluid. If signs of phlebitis are present the catheter should be removed. O • The leg and foot should be checked for swelling above the catheter site (indicating extravasation of fluid) and swelling of the P toes (indicating the bandage or tape is too tight). Either of these complications necessitates catheter removal. Q • Catheter patency should be maintained by any fluid running through it. If the catheter is not being used continuously, R intermittent flushing with heparinized saline should be performed several times a day (up to every 4 hours) as well as before and S after use. If a catheter becomes blocked it should be removed. • When a catheter is not in use, a sterile injection cap should be T used to close the catheter from the environment. Disconnection of fluid lines should be avoided and only performed when absolutely necessary to reduce contamination of the catheter. Potential complications • Catheter displacement/extravasation of fluids or medications • Phlebitis/thrombophlebitis • Thrombosis/thromboembolism • Infection • Dislodgement of catheter • Air embolism • Exsanguination',
  NULL,
  NULL,
  '• Sciatic nerve damage: this can be avoided during placement of a Q femoral cannula, by walking the needle off the medial edge of the greater trochanter R • Growth plate damage in young animals • Cannula displacement S • Subcutaneous leakage of fluids or medications • Infection T Intravenous catheter placement – (a) peripheral veins Indications/Use • Intravenous fluid administration • Intravenous drug administration Y • Repeat intravenous blood sampling, although a central line is often preferable for this indication Z 126 Procedures in Small Animal Practice',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_047',
  'Resting energy requirement',
  'R',
  137,
  NULL,
  '• Coagulopathy • Local tissue damage or skin infection in the ventral cervical region J',
  'K • As required for Aseptic preparation – (a) non-surgical',
  NULL,
  'F 1. With their hand under the sterile drape, an assistant raises the jugular vein. G 2. Make a stab incision over the I jugular vein. K M 3. Insert the introducer needle or an over-the-needle catheter into the vein in a rostrocaudal direction. If using an over-the-needle catheter, then remove the needle. The assistant should then stop raising the jugular vein. 4. Insert the guide R wire through the introducer needle S or catheter into the jugular vein. T – The guide wire is usually held U within an adapter to aid placement and may have a J-shaped tip. The J-shaped tip should be straightened by withdrawal into the adapter prior to insertion into the introducer needle or catheter. – The ECG should be monitored for arrhythmias, as overlong wires can enter the heart.',
  NULL,
  NULL,
  'W • Catheter displacement/extravasation of fluids or medications • Phlebitis/thrombophlebitis • Thrombosis/thromboembolism • Infection • Dislodgement of catheter • Air embolism • Exsanguination 128 Procedures in Small Animal Practice Intravenous catheter placement – (b) jugular vein (modified Seldinger technique) C',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_048',
  'Retrograde urethrography/vaginourethrography',
  'R',
  138,
  NULL,
  '• Coagulopathy • Local tissue damage or skin infection in the ventral cervical region J',
  'K • As required for Aseptic preparation – (a) non-surgical',
  NULL,
  'F 1. With their hand under the sterile drape, an assistant raises the jugular vein. G 2. Make a stab incision over the I jugular vein. K M 3. Insert the introducer needle or an over-the-needle catheter into the vein in a rostrocaudal direction. If using an over-the-needle catheter, then remove the needle. The assistant should then stop raising the jugular vein. 4. Insert the guide R wire through the introducer needle S or catheter into the jugular vein. T – The guide wire is usually held U within an adapter to aid placement and may have a J-shaped tip. The J-shaped tip should be straightened by withdrawal into the adapter prior to insertion into the introducer needle or catheter. – The ECG should be monitored for arrhythmias, as overlong wires can enter the heart. 130 Procedures in Small Animal Practice – Care must be taken to ensure that the guide wire is held at all times for the remainder of the procedure to prevent loss of the wire into the vein. 5. Remove the introducer needle or catheter, leaving the guide wire in place. D 6. Advance the vessel dilator over the guide wire and into the vein to enlarge the subcutaneous tunnel; then remove the dilator. H J L 7. Advance the catheter over the M wire and into the vein. O 8. Remove the guide wire. P 9. Place sterile injection caps, ideally incorporating on/off valves, on the end of Q each port of the catheter. Withdraw any air, plus some blood, from each port into R a syringe part-filled with heparinized saline, to prevent air embolism and S ensure intravascular placement. Then, immediately flush through each port with T heparinized saline. V 10. Secure the catheter to the patient with sutures placed through specific suture grooves or holes in a suture wing at the base of the catheter. Z',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_049',
  'Rhinoscopy',
  'R',
  140,
  NULL,
  'V • Renal failure W',
  '• As required for Urethral catheterization and Intravenous X catheter placement – (a) peripheral veins • Water-soluble contrast medium for intravenous use (see below for Y concentrations and dose rates) • 20–50 ml syringe Z 132 Procedures in Small Animal Practice • Giving set • 500 ml bag of 0.9% saline B Patient preparation and positioning • In an elective examination, withhold food for 24 hours before the procedure. • Give at least one non-irritant cleansing enema (e.g. warm water) 2–3 hours prior to examination. • Use general anaesthesia or heavy sedation, since injection of contrast medium in the conscious patient may cause retching, vomiting and struggling. • Pass a urinary catheter and drain the bladder of urine (see G Urethral catheterization). The catheter can be left in situ but should be pulled out of the bladder and into the proximal urethra. H • Positioning will be determined by views required (see below).',
  NULL,
  'I There are two basic techniques: • High-concentration, low-volume (bolus) IVU, with or without K abdominal compression: preferred for imaging the kidneys • Low-concentration, high-volume (infusion) IVU: preferred for L imaging the ureters. This technique may produce inferior renal opacification but gives improved visibility of the ureters due to M increased osmotic diuresis. N High-concentration, low-volume (bolus) IVU: 1. Obtain lateral and ventrodorsal plain radiographs of the abdomen O to check exposure factors and to allow comparison with subsequent contrast images. P 2. Position the patient in dorsal recumbency, as the ventrodorsal view is more helpful initially. Q 3. Inject contrast medium at room temperature or warmed to 37°C (to reduce viscosity) at 300–400 mg iodine/ml (concentration is R given as a number after the trade name) rapidly into a cephalic vein via a catheter. Dose rate is 850 mg iodine/kg bodyweight (i.e. S about 2 ml/kg). 4. Immediately take the first radiograph. T 5. Take further ventrodorsal radiographs at regular intervals (e.g. 2, 5, 10 and 15 minutes) until a clear nephrogram and pyelogram are U obtained. Then obtain a lateral view ± oblique views to visualize the ureters. 6. Continue until a diagnosis is made or a normal appearance is confirmed. Low-concentration, high-volume (infusion) IVU: 1. Obtain lateral and ventrodorsal plain radiographs to check exposure factors and to allow comparison with subsequent contrast images. If the study is to demonstrate the location of the ureter endings in incontinent patients, a pneumocystogram should be obtained to outline the bladder neck.',
  NULL,
  NULL,
  'L • Catheter displacement/extravasation of fluids or medications • Phlebitis/thrombophlebitis M • Thrombosis/thromboembolism • Infection N • Dislodgement of catheter • Air embolism O • Exsanguination Intravenous urography Q Indications R • Evaluation of renal size, shape, position and internal architecture • Demonstrating ureter position and patency • Investigation of urinary incontinence • Investigation of haematuria or pyuria NOT arising from the lower urinary tract U',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_050',
  'Skin scrapes',
  'S',
  142,
  NULL,
  'C • Known or suspected sensitivity to iodine-containing preparations D • Uncontrolled hyperthyroidism is a contraindication in humans • Should be used with care in animals with moderate to severe E impairment of renal function. Primarily excreted via kidneys and pre-existing renal disease predisposes to contrast media-induced F renal failure G Adverse reactions Anaphylaxis may occur following i.v. injection of any iodinated contrast medium. Nausea, vomiting, hypotension, dyspnoea, erythema, urticaria, sensation of heat, and cardiac rate or rhythm disturbances have been reported in humans following i.v. injection. Seizures or transient motor or sensory dysfunction have been reported in humans following myelography. Aspiration of high osmolar contrast media may result in pulmonary oedema. May aggravate clinical signs in patients with myasthenia gravis. These effects are more common with ionic than with non-ionic media and with hyper-osmolar media. Non-ionic low-osmolar and iso-osmolar agents have fewer adverse effects on the cardiovascular system and are safer in neonates and animals with cardiovascular disease. When used intravascularly, catheters should be fl ushed regularly to minimize risk of clotting; non-ionic media have less anticoagulant activity in vitro than ionic preparations. O Extravasation of high-osmolar agents may rarely lead to soft tissue injury. Warming the contrast media prior to injection reduces minor P side effects. Specifi c formulations for GI contrast studies cannot be used for other examinations due to the presence of additives. Drug interactions R Iodinated contrast media decrease thyroid uptake of iodine and preclude therapeutic radioiodine therapy for 2 months following administration. Hypersensitivity reactions may be aggravated in patients on beta blockers. U Iodine contrast studies see V • Intravenous urography • Retrograde urethrography/vaginourethrography X IV see • Intravenous Z',
  NULL,
  NULL,
  'I There are two basic techniques: • High-concentration, low-volume (bolus) IVU, with or without K abdominal compression: preferred for imaging the kidneys • Low-concentration, high-volume (infusion) IVU: preferred for L imaging the ureters. This technique may produce inferior renal opacification but gives improved visibility of the ureters due to M increased osmotic diuresis. N High-concentration, low-volume (bolus) IVU: 1. Obtain lateral and ventrodorsal plain radiographs of the abdomen O to check exposure factors and to allow comparison with subsequent contrast images. P 2. Position the patient in dorsal recumbency, as the ventrodorsal view is more helpful initially. Q 3. Inject contrast medium at room temperature or warmed to 37°C (to reduce viscosity) at 300–400 mg iodine/ml (concentration is R given as a number after the trade name) rapidly into a cephalic vein via a catheter. Dose rate is 850 mg iodine/kg bodyweight (i.e. S about 2 ml/kg). 4. Immediately take the first radiograph. T 5. Take further ventrodorsal radiographs at regular intervals (e.g. 2, 5, 10 and 15 minutes) until a clear nephrogram and pyelogram are U obtained. Then obtain a lateral view ± oblique views to visualize the ureters. 6. Continue until a diagnosis is made or a normal appearance is confirmed. Low-concentration, high-volume (infusion) IVU: 1. Obtain lateral and ventrodorsal plain radiographs to check exposure factors and to allow comparison with subsequent contrast images. If the study is to demonstrate the location of the ureter endings in incontinent patients, a pneumocystogram should be obtained to outline the bladder neck. Procedures in Small Animal Practice 133 2. Administer contrast medium at room temperature or warmed to 37°C (to reduce viscosity) at 150 mg iodine/ml (more concentrated media can be diluted with 0.9% saline) over 5–30 minutes into the cephalic vein via a catheter. Dose rate is 1200 mg iodine/kg bodyweight (i.e. 8 ml/kg). 3. Obtain radiographs as above, starting approximately 5 minutes into the infusion until a diagnosis is made, or a normal appearance is confi rmed. Potential complications • Anaphylaxis (rare): risk proportional to speed of injection, F concentration of agent and volume infused • Renal failure (rare): more likely with pre-existing renal disease; G therefore ensure adequate hydration before and during the procedure H Further details of these procedures and their interpretation can be found in the BSAVA Manual of J Canine and Feline Abdominal Imaging and the BSAVA Manual of Canine and Feline Nephrology and K Urology. M Iodinated contrast media Iodinated contrast media appear radiopaque on a radiograph due to iodine having a higher atomic number than soft tissues. There is a O wide range of iodinated contrast media available. None is authorized for veterinary use and most are POM. P Constituent Properties Trade name Uses Formulations (mg iodine/ml) Spinal Vascular, urinary GI R Iotalamic Monomer Conray – + – 141; 202; 280; acid Ionic 400 High-osmolar Sodim Monomer Urografi n – + – 146; 325; 370 meglumine Ionic diatrizoate High-osmolar Iohexol Monomer Omnipaque + + + 140; 180; 240; V Non-ionic 300; 350 Low-osmolar W Use X • Contrast studies of the GI tract and urinary tract, angiography, arthrography, sialography, dacryocystography, sino- or fi stulography and myelography 134 Procedures in Small Animal Practice • Only non-ionic agents may be used for myelography, but not all non-ionic agents are authorized for myelography in humans • Fluid and electrolyte disturbances should be corrected prior to use B',
  NULL,
  NULL,
  '• Anaphylaxis (rare): risk proportional to speed of injection, F concentration of agent and volume infused • Renal failure (rare): more likely with pre-existing renal disease; G therefore ensure adequate hydration before and during the procedure H Further details of these procedures and their interpretation can be found in the BSAVA Manual of J Canine and Feline Abdominal Imaging and the BSAVA Manual of Canine and Feline Nephrology and K Urology. M Iodinated contrast media Iodinated contrast media appear radiopaque on a radiograph due to iodine having a higher atomic number than soft tissues. There is a O wide range of iodinated contrast media available. None is authorized for veterinary use and most are POM. P Constituent Properties Trade name Uses Formulations (mg iodine/ml) Spinal Vascular, urinary GI R Iotalamic Monomer Conray – + – 141; 202; 280; acid Ionic 400 High-osmolar Sodim Monomer Urografi n – + – 146; 325; 370 meglumine Ionic diatrizoate High-osmolar Iohexol Monomer Omnipaque + + + 140; 180; 240; V Non-ionic 300; 350 Low-osmolar W Use X • Contrast studies of the GI tract and urinary tract, angiography, arthrography, sialography, dacryocystography, sino- or fi stulography and myelography 134 Procedures in Small Animal Practice • Only non-ionic agents may be used for myelography, but not all non-ionic agents are authorized for myelography in humans • Fluid and electrolyte disturbances should be corrected prior to use B',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_051',
  'Surgical examination of the ear',
  'S',
  144,
  NULL,
  'C • Known or suspected sensitivity to iodine-containing preparations D • Uncontrolled hyperthyroidism is a contraindication in humans • Should be used with care in animals with moderate to severe E impairment of renal function. Primarily excreted via kidneys and pre-existing renal disease predisposes to contrast media-induced F renal failure G Adverse reactions Anaphylaxis may occur following i.v. injection of any iodinated contrast medium. Nausea, vomiting, hypotension, dyspnoea, erythema, urticaria, sensation of heat, and cardiac rate or rhythm disturbances have been reported in humans following i.v. injection. Seizures or transient motor or sensory dysfunction have been reported in humans following myelography. Aspiration of high osmolar contrast media may result in pulmonary oedema. May aggravate clinical signs in patients with myasthenia gravis. These effects are more common with ionic than with non-ionic media and with hyper-osmolar media. Non-ionic low-osmolar and iso-osmolar agents have fewer adverse effects on the cardiovascular system and are safer in neonates and animals with cardiovascular disease. When used intravascularly, catheters should be fl ushed regularly to minimize risk of clotting; non-ionic media have less anticoagulant activity in vitro than ionic preparations. O Extravasation of high-osmolar agents may rarely lead to soft tissue injury. Warming the contrast media prior to injection reduces minor P side effects. Specifi c formulations for GI contrast studies cannot be used for other examinations due to the presence of additives. Drug interactions R Iodinated contrast media decrease thyroid uptake of iodine and preclude therapeutic radioiodine therapy for 2 months following administration. Hypersensitivity reactions may be aggravated in patients on beta blockers. U Iodine contrast studies see V • Intravenous urography • Retrograde urethrography/vaginourethrography X IV see • Intravenous Z Procedures in Small Animal Practice 135 Joint tap see A • Arthrocentesis C E G I K M O Q S U W Y 136 Procedures in Small Animal Practice A Mucous membrane colour see • Cardiorespiratory examination C',
  'J • Otoscope with a sterilized otoscopic speculum; a video-otoscope is best but not essential • Sterile catheters (e.g. 3.5 Fr tom cat catheter, long polypropylene catheter, 3.5 Fr feeding tube) of suffi cient length to access the tympanic membrane via the working channel of a video-otoscope M or along the speculum of an ordinary otoscope • 2.5 or 5 ml, plus two 20 ml syringes N • 3-way tap • Sterile saline O • Otic ceruminolytic agent (may be needed in dogs) • Bacteriological swab P • EDTA sample pots • Microscope slides Patient preparation and positioning R • In chronic otitis externa, a short course of systemic glucocorticoids may aid optimal visualization of the tympanic membrane. S • General anaesthesia is required. • A properly placed and infl ated endotracheal tube is recommended T due to possible drainage of fl uid from the middle ear canal into the pharynx. U • The animal is placed in lateral or sternal recumbency. A towel may be used to elevate the caudal head and neck slightly in relation to V the muzzle. • Protect the animal’s eyes if ceruminolytics are used to clean the external ear canal. X Technique Personnel should wear gloves, face mask and, ideally, eye Z protectors to avoid contact with contaminated aerosols.',
  NULL,
  'Y Personnel should wear gloves, face mask and, ideally, eye Z protectors to avoid contact with contaminated aerosols.',
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_052',
  'Thoracocentesis',
  'T',
  148,
  '• Patients requiring oxygen for several days • Patients that do not tolerate an oxygen mask • Patients that are too large to fi t inside an oxygen cage G',
  'H • Inspired oxygen concentrations may not be high enough for very I hypoxic animals, particularly if they are mouth-breathing. In very hypoxic animals, bilateral nasal oxygen lines can be used J • Not useful for brachycephalic animals or patients with facial disease or pain K',
  'L • Rubber catheter/soft polythene feeding tube: large dogs: 5–10 Fr, depending on the size of the animal; 5 Fr in cats and dogs <5 kg M • Nasal prongs • Topical local anaesthetic N • Sterile aqueous lubricant (e.g. K-Y jelly) • Non-absorbable suture material, needle and needle-holders O • Tissue glue • 25 mm wide adhesive tape P • Oxygen delivery system • Humidifi er (container fi lled with distilled water) • Elizabethan collar R Patient preparation and positioning • Usually performed in the conscious animal, although fractious animals may benefi t from light sedation. • The patient is positioned in sternal recumbency, or sitting. • Apply several drops of local anaesthetic down one nostril and wait approximately 10 minutes before inserting the catheter. U',
  NULL,
  'V Nasal catheter W 1. Measure the distance from the nares to the medial canthus of the eye and mark this on the catheter. X 2. Following desensitization of the nostril with a topical anaesthetic, gently insert the lubricated catheter into the nostril in a Y ventromedial direction (toward the base of the opposite ear) and advance it to the mark. The nasal planum can be pushed dorsally Z to direct the tube ventrally. Procedures in Small Animal Practice 139 3. Once the catheter is in place, it is contoured around the alar fold, and sutured or glued in place on the side of the face. For the most secure placement, a suture should be placed as close to the nasal-cutaneous junction as possible. 4. Attach the nasal catheter to an oxygen delivery system with fl ow rates of 100–200 ml/kg/minute. 5. Humidify the oxygen by bubbling it through a chamber fi lled with distilled water. 6. Place an Elizabethan collar. Nasal prongs F • Some animals can be best managed using human bilateral nasal ‘prongs’ that penetrate 1 cm or less into the nasal cavity. G • Inspired oxygen concentrations of 30–50% can easily be achieved using this type of system, although panting probably limits the H effectiveness of prongs. Potential complications • Long-term therapy with high concentrations of oxygen (FO >0.6 for i 2 >12 hours, or sooner with assisted ventilation) can be associated with lung damage (‘oxygen toxicity’). Although rare, every effort should be made to minimize FO for critically ill patients i 2 L • Sneezing and dislodgement of catheter or prongs • Nasal discharge is common but is not clinically signifi cant N Further information on administration of supplementary oxygen, including the use of masks O and oxygen cages, can be found in the BSAVA Manual of Canine and Feline Anaesthesia and P Analgesia and the BSAVA Manual of Canine and Feline Emergency and Critical Care. Q Naso-oesophageal tube placement S Indications/Use • Short-term nutritional support (2–3 days) of cats or small dogs. In U large dogs, the sheer volume of a liquid diet required to meet the energy needs is frequently limiting • Animals that require assisted feeding but in which general anaesthesia is contraindicated X',
  NULL,
  NULL,
  'J • Long-term therapy with high concentrations of oxygen (FO >0.6 for i 2 >12 hours, or sooner with assisted ventilation) can be associated with lung damage (‘oxygen toxicity’). Although rare, every effort should be made to minimize FO for critically ill patients i 2 L • Sneezing and dislodgement of catheter or prongs • Nasal discharge is common but is not clinically signifi cant N Further information on administration of supplementary oxygen, including the use of masks O and oxygen cages, can be found in the BSAVA Manual of Canine and Feline Anaesthesia and P Analgesia and the BSAVA Manual of Canine and Feline Emergency and Critical Care. Q Naso-oesophageal tube placement S Indications/Use • Short-term nutritional support (2–3 days) of cats or small dogs. In U large dogs, the sheer volume of a liquid diet required to meet the energy needs is frequently limiting • Animals that require assisted feeding but in which general anaesthesia is contraindicated X',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_053',
  'Tracheal wash – endotracheal',
  'T',
  150,
  NULL,
  NULL,
  'C • Naso-oesophageal tube – Cats: 3.5–5 Fr – Dogs: 3.5–8 Fr • 5–10 ml syringe • Topical local anaesthetic gel and drops • 25 mm wide adhesive tape • Suture materials • Elizabethan collar Patient preparation and positioning • The procedure should be performed with the animal conscious or I under light sedation. • The patient can be positioned standing, or in lateral or sternal J recumbency. • The animal’s head should be placed in a ‘neutral’ position (i.e. not K too flexed or extended). L Technique 1. Instil anaesthetic drops into one nostril. M 2. Measure the distance from the nose to the 7th intercostal space and mark this on the tube with a piece of tape. N 3. Lubricate the tube with anaesthetic gel to aid insertion. 4. Aim the tube ventromedially (toward the base of the opposite ear) O so that it will pass into the ventral meatus of the nasal cavity. The nasal planum can be pushed dorsally to direct the tube ventrally. P 5. Pass the tube until it reaches the predetermined position (nose to 7th intercostal space). It is very important to check its position carefully. If the tube is in the oesophagus, there should be negative pressure when suction is placed on the tube using a 5–10 ml syringe. As an additional test, instil a small amount of water into the tube before administering food. 6. A lateral radiograph can be taken to ensure not only that the tube is in the proper location (and ends in the distal third of the oesophagus, not the stomach), but also that the tube is not kinked or twisted. 7. Make two butterfly tape strips using 25 mm wide adhesive tape and attach these to the tube. 8. Suture or tissue glue these tape strips to the dorsal aspect of the muzzle and the top of the head. 9. Place an Elizabethan collar. X',
  NULL,
  '1. Instil anaesthetic drops into one nostril. M 2. Measure the distance from the nose to the 7th intercostal space and mark this on the tube with a piece of tape. N 3. Lubricate the tube with anaesthetic gel to aid insertion. 4. Aim the tube ventromedially (toward the base of the opposite ear) O so that it will pass into the ventral meatus of the nasal cavity. The nasal planum can be pushed dorsally to direct the tube ventrally. P 5. Pass the tube until it reaches the predetermined position (nose to 7th intercostal space). It is very important to check its position carefully. If the tube is in the oesophagus, there should be negative pressure when suction is placed on the tube using a 5–10 ml syringe. As an additional test, instil a small amount of water into the tube before administering food. 6. A lateral radiograph can be taken to ensure not only that the tube is in the proper location (and ends in the distal third of the oesophagus, not the stomach), but also that the tube is not kinked or twisted. 7. Make two butterfly tape strips using 25 mm wide adhesive tape and attach these to the tube. 8. Suture or tissue glue these tape strips to the dorsal aspect of the muzzle and the top of the head. 9. Place an Elizabethan collar. X',
  NULL,
  NULL,
  '• Rhinitis L • Vomiting • Regurgitation M • Aspiration of oesophageal contents • Tube dislodgement N Further information on assisted feeding can be found in the BSAVA Manual of Canine and Feline P Gastroenterology and the BSAVA Manual of Canine and Feline Rehabilitation, Supportive and Palliative Q Care. S Neurological examination Indications/Use U • To diagnose and localize disorders of the nervous system • To provide information on the severity of any disorder Equipment W • Refl ex hammer • A bright light source • Artery forceps • Hypodermic needle • 70% surgical spirit 142 Procedures in Small Animal Practice Patient preparation and positioning • The neurological examination should be performed with the B animal conscious. • Animals should be kept calm throughout the examination. C • Positioning will vary, depending on the part of the examination being performed. D',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_054',
  'Tracheal wash – transtracheal',
  'T',
  152,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_055',
  'Tracheostomy tube placement',
  'T',
  154,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_056',
  'Urethral catheterization – female dog',
  'U',
  157,
  '• Nutritional support for weeks to months F Contraindications G • Comatose, recumbent or dysphoric animals at risk of aspiration • Persistent vomiting – the tube may be expelled or retrofl exed into the nasopharynx • Oesophagitis or severe oesophageal dysfunction (e.g. megaoesophagus) J',
  NULL,
  'K • As required for Aseptic preparation – (a) surgical procedures • Oesophagostomy tube (red rubber tube, standard polyurethane L feeding tube or silicone feeding tube): – Cats: 10–14 Fr; 23 cm long M – Dogs: 14–24 Fr; 40 cm long • OR Percutaneous oesophagostomy tube placement kit N (containing oesophagostomy tube, rigid introducer and needle with peel-away sheath) O • Long curved forceps, e.g. Rochester–Carmalt • No. 15 or 20 scalpel P • 25 mm wide adhesive tape • Suture materials Q • Sterile dressing to cover the tube site • Light bandage for neck R Patient preparation and positioning • General anaesthesia is required. T • The patient is placed in right lateral recumbency. • Aseptic preparation – (a) surgical procedures from the dorsal U to the ventral aspects of the neck is required over an area from the angle of the jaw to the shoulder. V Technique W Surgical cut-down 1. Insert curved forceps through the mouth and into the oesophagus, Y to the mid-cervical region. Z',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_057',
  'Urethral catheterization – female cat',
  'U',
  158,
  '• Nutritional support for weeks to months F Contraindications G • Comatose, recumbent or dysphoric animals at risk of aspiration • Persistent vomiting – the tube may be expelled or retrofl exed into the nasopharynx • Oesophagitis or severe oesophageal dysfunction (e.g. megaoesophagus) J',
  NULL,
  'K • As required for Aseptic preparation – (a) surgical procedures • Oesophagostomy tube (red rubber tube, standard polyurethane L feeding tube or silicone feeding tube): – Cats: 10–14 Fr; 23 cm long M – Dogs: 14–24 Fr; 40 cm long • OR Percutaneous oesophagostomy tube placement kit N (containing oesophagostomy tube, rigid introducer and needle with peel-away sheath) O • Long curved forceps, e.g. Rochester–Carmalt • No. 15 or 20 scalpel P • 25 mm wide adhesive tape • Suture materials Q • Sterile dressing to cover the tube site • Light bandage for neck R Patient preparation and positioning • General anaesthesia is required. T • The patient is placed in right lateral recumbency. • Aseptic preparation – (a) surgical procedures from the dorsal U to the ventral aspects of the neck is required over an area from the angle of the jaw to the shoulder. V Technique W Surgical cut-down 1. Insert curved forceps through the mouth and into the oesophagus, Y to the mid-cervical region. 150 Procedures in Small Animal Practice 2. Turn the tip of the forceps laterally and make a 5–10 mm skin incision over the point of the tips. D E 3. Bluntly dissect through the subcutaneous tissues and make an incision into the oesophagus over the tips of the forceps. F 4. Push the tips of the forceps outwards through the incision to the external surface. G 5. Measure the oesophagostomy tube from this point to the 7th intercostal space (distal oesophagus) and mark the tube with a piece of adhesive tape. 6. Open the tips of the J forceps and grasp the distal end of the feeding K tube. M 7. Draw the end of the tube through the oesophagostomy incision and rostrally into the pharynx to exit the mouth. Q 8. Disengage the tips of the S forceps, and curl the tip of the tube back into the T mouth and feed it into the oesophagus. 9. Visually inspect the oropharynx to confirm that the tube is no longer present in the oropharynx. 10. The tube should slide easily back and forth a few millimetres, confirming that it has straightened.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_058',
  'Urethral catheterization – male dog',
  'U',
  159,
  '• Nutritional support for weeks to months F Contraindications G • Comatose, recumbent or dysphoric animals at risk of aspiration • Persistent vomiting – the tube may be expelled or retrofl exed into the nasopharynx • Oesophagitis or severe oesophageal dysfunction (e.g. megaoesophagus) J',
  NULL,
  'K • As required for Aseptic preparation – (a) surgical procedures • Oesophagostomy tube (red rubber tube, standard polyurethane L feeding tube or silicone feeding tube): – Cats: 10–14 Fr; 23 cm long M – Dogs: 14–24 Fr; 40 cm long • OR Percutaneous oesophagostomy tube placement kit N (containing oesophagostomy tube, rigid introducer and needle with peel-away sheath) O • Long curved forceps, e.g. Rochester–Carmalt • No. 15 or 20 scalpel P • 25 mm wide adhesive tape • Suture materials Q • Sterile dressing to cover the tube site • Light bandage for neck R Patient preparation and positioning • General anaesthesia is required. T • The patient is placed in right lateral recumbency. • Aseptic preparation – (a) surgical procedures from the dorsal U to the ventral aspects of the neck is required over an area from the angle of the jaw to the shoulder. V Technique W Surgical cut-down 1. Insert curved forceps through the mouth and into the oesophagus, Y to the mid-cervical region. 150 Procedures in Small Animal Practice 2. Turn the tip of the forceps laterally and make a 5–10 mm skin incision over the point of the tips. D E 3. Bluntly dissect through the subcutaneous tissues and make an incision into the oesophagus over the tips of the forceps. F 4. Push the tips of the forceps outwards through the incision to the external surface. G 5. Measure the oesophagostomy tube from this point to the 7th intercostal space (distal oesophagus) and mark the tube with a piece of adhesive tape. 6. Open the tips of the J forceps and grasp the distal end of the feeding K tube. M 7. Draw the end of the tube through the oesophagostomy incision and rostrally into the pharynx to exit the mouth. Q 8. Disengage the tips of the S forceps, and curl the tip of the tube back into the T mouth and feed it into the oesophagus. 9. Visually inspect the oropharynx to confirm that the tube is no longer present in the oropharynx. 10. The tube should slide easily back and forth a few millimetres, confirming that it has straightened. Procedures in Small Animal Practice 151 11. Secure the tube by placement of a Chinese finger-trap suture. 12. Take a thoracic radiograph to confirm correct tube placement: the tip of the tube should be in the distal oesophagus, not the stomach. 13. Cover the tube site with a sterile dressing and place a soft, padded, loose, neck bandage. Using a percutaneous kit (van Noort technique) 1. Insert the rigid introducer into the mid-cervical oesophagus via the E oral cavity. 2. Rotate the introducer until you can feel the slot in its distal F portion. 3. Make a small stab incision through the skin over the slot. G 4. Introduce the needle with peel-away sheath through the skin incision into the distal portion of the rigid introducer. H 5. Whilst holding the sheath in place, remove the needle from the sheath. I 6. Remove the rigid introducer. 7. Measure the oesophagostomy tube from the needle entry point to J the 7th intercostal space and mark the tube with a piece of adhesive tape. K 8. Introduce the oesophagostomy tube through the sheath and down the oesophagus, stopping at the pre-marked length. L 9. Grasping either side of the sheath, peel it away from the tube and remove it, to leave only the tube in place. M 10. Secure the tube with a Chinese finger-trap suture. 11. Take a thoracic radiograph to confirm correct tube placement: the tip of the tube should be in the distal oesophagus, not the stomach. 12. Cover the tube site with a sterile dressing and place a soft, padded, loose, neck bandage. Q',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_059',
  'Urethral catheterization – male cat',
  'U',
  161,
  '• Examination in cases of suspected ocular disease R • Testing vision S Equipment • Bright focal light source, such as a penlight torch • Direct ophthalmoscope U • Hand lens (28–30 dioptres (D)) • Topical local anaesthetic V • Mydriatic (e.g. tropicamide) • Cotton wool balls W • An indirect goniolens • 0.9% saline X • Tonometer such as a Schiøtz tonometer or TonoPen Y Patient preparation and position • This test is performed in the conscious animal without sedation. • Position the animal in a standing or sitting position. Procedures in Small Animal Practice 153 Examination with normal illumination and without instruments 1. Begin by observing the patient from a distance. B i. Assess for evidence of pain. ii. Evaluate the blink rate, checking for blepharospasm and C photophobia. iii. Assess orbital and periocular conformation. Note particularly D any asymmetry – by assessing the orbit, the globe size and position – and any strabismus. E iv. Examine the conformation of the upper and lower eyelids and the position of the nictitating membrane. F v. Note the presence and nature of any discharge. 2. Now handle the patient. G i. Examine the lids and conjunctiva. a. Retract the upper lid and examine the dorsal bulbar H conjunctiva; evert the lid margin and check the upper palpebral conjunctiva and upper lacrimal punctum. b. Then apply pressure to the globe through the upper lid and protrude the nictitating membrane, checking its leading edge, its alignment and its outer surface. c. Retract the lower lid and observe the lower lacrimal punctum and the conjunctiva as it enters the fornix. ii. Check the corneal reflex (the smoothness and sharpness of the reflection of a light on the corneal surface). iii. Note the resting pupil size in normal room light. iv. Attempt to repel the globes into the orbits by pressing gently through the upper eyelids. Testing vision • The menace response is tested by directing a finger towards the P eye and observing a blink or retraction of the head. Do not cause a draught of air to contact the cornea as this may give a false Q positive result. • Vision may also be tested using cotton wool balls. Hold the ball R high and direct the animal’s attention towards it by making a noise. Then release the ball in the animal’s field of view and watch to see S whether the animal follows its path. • Sighted animals, especially young ones, will readily follow the T beam from the ophthalmoscope played on the examination table. • An obstacle course may be improvised from chairs, waste bins, U etc. The animal’s performance may be assessed for both eyes or with one eye covered, and in full light or dim light. V Examination in a darkened room, with focal W illumination and magnification 1. Examine the adnexa, paying particular attention to the lid margins and conjunctival surfaces. 2. Examine the cornea, looking for lesions such as irregularities, opacities, vascularization and pigmentation, along with their depth and distribution.',
  NULL,
  '• Bright focal light source, such as a penlight torch • Direct ophthalmoscope U • Hand lens (28–30 dioptres (D)) • Topical local anaesthetic V • Mydriatic (e.g. tropicamide) • Cotton wool balls W • An indirect goniolens • 0.9% saline X • Tonometer such as a Schiøtz tonometer or TonoPen Y Patient preparation and position • This test is performed in the conscious animal without sedation. • Position the animal in a standing or sitting position. Procedures in Small Animal Practice 153 Examination with normal illumination and without instruments 1. Begin by observing the patient from a distance. B i. Assess for evidence of pain. ii. Evaluate the blink rate, checking for blepharospasm and C photophobia. iii. Assess orbital and periocular conformation. Note particularly D any asymmetry – by assessing the orbit, the globe size and position – and any strabismus. E iv. Examine the conformation of the upper and lower eyelids and the position of the nictitating membrane. F v. Note the presence and nature of any discharge. 2. Now handle the patient. G i. Examine the lids and conjunctiva. a. Retract the upper lid and examine the dorsal bulbar H conjunctiva; evert the lid margin and check the upper palpebral conjunctiva and upper lacrimal punctum. b. Then apply pressure to the globe through the upper lid and protrude the nictitating membrane, checking its leading edge, its alignment and its outer surface. c. Retract the lower lid and observe the lower lacrimal punctum and the conjunctiva as it enters the fornix. ii. Check the corneal reflex (the smoothness and sharpness of the reflection of a light on the corneal surface). iii. Note the resting pupil size in normal room light. iv. Attempt to repel the globes into the orbits by pressing gently through the upper eyelids. Testing vision • The menace response is tested by directing a finger towards the P eye and observing a blink or retraction of the head. Do not cause a draught of air to contact the cornea as this may give a false Q positive result. • Vision may also be tested using cotton wool balls. Hold the ball R high and direct the animal’s attention towards it by making a noise. Then release the ball in the animal’s field of view and watch to see S whether the animal follows its path. • Sighted animals, especially young ones, will readily follow the T beam from the ophthalmoscope played on the examination table. • An obstacle course may be improvised from chairs, waste bins, U etc. The animal’s performance may be assessed for both eyes or with one eye covered, and in full light or dim light. V Examination in a darkened room, with focal W illumination and magnification 1. Examine the adnexa, paying particular attention to the lid margins and conjunctival surfaces. 2. Examine the cornea, looking for lesions such as irregularities, opacities, vascularization and pigmentation, along with their depth and distribution.',
  NULL,
  NULL,
  NULL,
  NULL,
  'H • Infection of the stoma site • Oesophageal stricture formation (rare) • Fistula formation (rare) Further information on assisted feeding can be found in the BSAVA Manual of Canine and Feline Gastroenterology and BSAVA Manual of Canine and Feline Rehabilitation, Supportive and Palliative Care. N Ophthalmic examination P See also Fluorescein test; Schirmer tear test Q Indications/Use • Examination in cases of suspected ocular disease R • Testing vision S Equipment • Bright focal light source, such as a penlight torch • Direct ophthalmoscope U • Hand lens (28–30 dioptres (D)) • Topical local anaesthetic V • Mydriatic (e.g. tropicamide) • Cotton wool balls W • An indirect goniolens • 0.9% saline X • Tonometer such as a Schiøtz tonometer or TonoPen Y Patient preparation and position • This test is performed in the conscious animal without sedation. • Position the animal in a standing or sitting position. Procedures in Small Animal Practice 153 Examination with normal illumination and without instruments 1. Begin by observing the patient from a distance. B i. Assess for evidence of pain. ii. Evaluate the blink rate, checking for blepharospasm and C photophobia. iii. Assess orbital and periocular conformation. Note particularly D any asymmetry – by assessing the orbit, the globe size and position – and any strabismus. E iv. Examine the conformation of the upper and lower eyelids and the position of the nictitating membrane. F v. Note the presence and nature of any discharge. 2. Now handle the patient. G i. Examine the lids and conjunctiva. a. Retract the upper lid and examine the dorsal bulbar H conjunctiva; evert the lid margin and check the upper palpebral conjunctiva and upper lacrimal punctum. b. Then apply pressure to the globe through the upper lid and protrude the nictitating membrane, checking its leading edge, its alignment and its outer surface. c. Retract the lower lid and observe the lower lacrimal punctum and the conjunctiva as it enters the fornix. ii. Check the corneal reflex (the smoothness and sharpness of the reflection of a light on the corneal surface). iii. Note the resting pupil size in normal room light. iv. Attempt to repel the globes into the orbits by pressing gently through the upper eyelids. Testing vision • The menace response is tested by directing a finger towards the P eye and observing a blink or retraction of the head. Do not cause a draught of air to contact the cornea as this may give a false Q positive result. • Vision may also be tested using cotton wool balls. Hold the ball R high and direct the animal’s attention towards it by making a noise. Then release the ball in the animal’s field of view and watch to see S whether the animal follows its path. • Sighted animals, especially young ones, will readily follow the T beam from the ophthalmoscope played on the examination table. • An obstacle course may be improvised from chairs, waste bins, U etc. The animal’s performance may be assessed for both eyes or with one eye covered, and in full light or dim light. V Examination in a darkened room, with focal W illumination and magnification 1. Examine the adnexa, paying particular attention to the lid margins and conjunctival surfaces. 2. Examine the cornea, looking for lesions such as irregularities, opacities, vascularization and pigmentation, along with their depth and distribution.',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_060',
  'Urinalysis',
  'U',
  163,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_061',
  'Vaginoscopy',
  'V',
  170,
  '• To detect hip laxity in the young dog (to support a diagnosis of hip dysplasia) Not all dogs with hip dysplasia show a positive Ortolani sign. For E example, dogs with gross subluxation or luxation of the femoral head, and dogs in which capsular fibrosis has stabilized the hip F joint will not show the sign. Patient preparation and positioning H • May be attempted in the conscious animal but is potentially painful and therefore best performed with the dog heavily sedated or I under general anaesthesia. • The animal may be positioned in lateral or dorsal recumbency. J The description below applies to lateral recumbency. K Technique 1. Position the stifle in mild flexion and grasp it with one hand, with the other hand placed on the dorsal aspect of the pelvis to stabilize it. 2. Apply firm pressure N (ii) Abduction to the stifle in a dorsal direction in an attempt to subluxate the hip joint. 3. Whilst maintaining dorsal pressure on the stifle, gently (i) Dorsal R abduct the limb until pressure a ‘click’ or ‘clunk’ is S detected. • If the dorsal acetabular T rim is intact, the femoral head falls abruptly into the acetabulum. U • In dogs with a poor dorsal acetabular rim, the femoral head appears to slide back into the acetabulum. 4. Whilst maintaining dorsal pressure on the stifle, if the limb is now W adducted, re-luxation of the hip will occur. X Results • The ‘click’ or ‘clunk’ (see Step 3) represents the relocation of the femoral head within the acetabulum. This is the positive Ortolani sign, consistent with hip joint laxity. Procedures in Small Animal Practice 161 More detail on this procedure and interpretation of the results can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. D Oscillometric blood pressure measurement see • Blood pressure measurement – (b) indirect G',
  NULL,
  'L • Otoscope and cones of varying lengths and diameters • OR a video-otoscope • Cotton wool • Haemostats for hair removal (if necessary) • Sterile microbiology swab and transport medium • Cotton wool buds • Microscope slides • 0.9% sterile saline • 10 ml syringes • Kidney dish • Sprula needle or sterile catheters (e.g. 3.5 Fr tomcat catheter, long polypropylene catheter, 3.5 Fr feeding tube) of length suffi cient to pass along the full length of the external canal Patient preparation and positioning • The animal can be examined standing, sitting or in lateral T recumbency. • Sedation or general anaesthesia may be required. U • Hair is removed, if necessary, by grasping groups of hairs with haemostats and twisting the handle. V Technique W 1. Examine the pinnae and entrance to the ear canals with the naked eye. 2. Palpate the ear canal to evaluate pain, thickening and ossifi cation of the ear canal. Note the presence of pus or cerumen. Examine each ear with the otoscope, starting with the normal ear if there is Z 162 Procedures in Small Animal Practice one. Apply lateral tension to the ear pinna with fi ngers to straighten the ear canal as the otoscope is advanced. 3. Visualize the tympanic membrane; in a normal ear this appears as a concave translucent membrane, with a dorsal, white, thick, well vascularized pars fl accida and a ventral semi-transparent pars tensa. 4. If signifi cant pus or cerumen obscures evaluation of the ear canal or tympanic membrane, the ear can be fl ushed with lukewarm sterile saline. This is drawn into a 5–10 ml syringe attached to the sprula needle or catheter, fl ushed into the ear canal, and re-aspirated. If possible, this is best performed under otoscopic visualization, with the needle or catheter passed through the otoscope cone. Sample handling • Obtain samples for microbiological culture fi rst. These can be I collected using a sterile swab inserted through the sterile cone of an otoscope attachment and then placed in transport medium for J dispatch to the laboratory. • To obtain cytology samples, a cotton bud or sterile swab is K inserted down to the junction between the vertical and horizontal ear canals. The bud is rotated to collect debris: L – This may be transferred to a slide with liquid paraffi n and a coverslip applied prior to examination with a microscope, using M low (4X objective) power – A smear can be made by rolling the cotton bud gently on to a microscope slide, then air-dried and stained, as required. Potential complications P • Rupture of tympanic membrane • Injury to external ear canal R Further information on video-otoscopy can be found in the BSAVA Manual of Canine and Feline S Endoscopy and Endosurgery. U Oxygen therapy see • Nasal oxygen administration W Y Z',
  NULL,
  '1. Position the stifle in mild flexion and grasp it with one hand, with the other hand placed on the dorsal aspect of the pelvis to stabilize it. 2. Apply firm pressure N (ii) Abduction to the stifle in a dorsal direction in an attempt to subluxate the hip joint. 3. Whilst maintaining dorsal pressure on the stifle, gently (i) Dorsal R abduct the limb until pressure a ‘click’ or ‘clunk’ is S detected. • If the dorsal acetabular T rim is intact, the femoral head falls abruptly into the acetabulum. U • In dogs with a poor dorsal acetabular rim, the femoral head appears to slide back into the acetabulum. 4. Whilst maintaining dorsal pressure on the stifle, if the limb is now W adducted, re-luxation of the hip will occur. X Results • The ‘click’ or ‘clunk’ (see Step 3) represents the relocation of the femoral head within the acetabulum. This is the positive Ortolani sign, consistent with hip joint laxity. Procedures in Small Animal Practice 161 More detail on this procedure and interpretation of the results can be found in the BSAVA Manual of Canine and Feline Musculoskeletal Disorders. D Oscillometric blood pressure measurement see • Blood pressure measurement – (b) indirect G',
  NULL,
  NULL,
  'P • Rupture of tympanic membrane • Injury to external ear canal R Further information on video-otoscopy can be found in the BSAVA Manual of Canine and Feline S Endoscopy and Endosurgery. U Oxygen therapy see • Nasal oxygen administration W Y Z',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

INSERT INTO vt_procedures (
  procedure_id, name, category, page_number,
  indications, contraindications, equipment,
  patient_preparation, technique, procedure_steps,
  aftercare, complications, "references"
) VALUES (
  'proc_062',
  'Venepuncture',
  'V',
  171,
  'I • To obtain specimens for diagnosis of external ear canal disease • To treat otitis externa. (For sampling and treating otitis media see J Myringotomy) K',
  '• Suspected coagulopathy H • Active pericardial haemorrhage • Severe arrhythmia I',
  'L • Otoscope and cones of varying lengths and diameters • OR a video-otoscope • Cotton wool • Haemostats for hair removal (if necessary) • Sterile microbiology swab and transport medium • Cotton wool buds • Microscope slides • 0.9% sterile saline • 10 ml syringes • Kidney dish • Sprula needle or sterile catheters (e.g. 3.5 Fr tomcat catheter, long polypropylene catheter, 3.5 Fr feeding tube) of length suffi cient to pass along the full length of the external canal Patient preparation and positioning • The animal can be examined standing, sitting or in lateral T recumbency. • Sedation or general anaesthesia may be required. U • Hair is removed, if necessary, by grasping groups of hairs with haemostats and twisting the handle. V Technique W 1. Examine the pinnae and entrance to the ear canals with the naked eye. 2. Palpate the ear canal to evaluate pain, thickening and ossifi cation of the ear canal. Note the presence of pus or cerumen. Examine each ear with the otoscope, starting with the normal ear if there is Z 162 Procedures in Small Animal Practice one. Apply lateral tension to the ear pinna with fi ngers to straighten the ear canal as the otoscope is advanced. 3. Visualize the tympanic membrane; in a normal ear this appears as a concave translucent membrane, with a dorsal, white, thick, well vascularized pars fl accida and a ventral semi-transparent pars tensa. 4. If signifi cant pus or cerumen obscures evaluation of the ear canal or tympanic membrane, the ear can be fl ushed with lukewarm sterile saline. This is drawn into a 5–10 ml syringe attached to the sprula needle or catheter, fl ushed into the ear canal, and re-aspirated. If possible, this is best performed under otoscopic visualization, with the needle or catheter passed through the otoscope cone. Sample handling • Obtain samples for microbiological culture fi rst. These can be I collected using a sterile swab inserted through the sterile cone of an otoscope attachment and then placed in transport medium for J dispatch to the laboratory. • To obtain cytology samples, a cotton bud or sterile swab is K inserted down to the junction between the vertical and horizontal ear canals. The bud is rotated to collect debris: L – This may be transferred to a slide with liquid paraffi n and a coverslip applied prior to examination with a microscope, using M low (4X objective) power – A smear can be made by rolling the cotton bud gently on to a microscope slide, then air-dried and stained, as required. Potential complications P • Rupture of tympanic membrane • Injury to external ear canal R Further information on video-otoscopy can be found in the BSAVA Manual of Canine and Feline S Endoscopy and Endosurgery. U Oxygen therapy see • Nasal oxygen administration W Y Procedures in Small Animal Practice 163 Percutaneous endoscopic gastrostomy (PEG) A tube see • Gastrostomy tube placement – (a) endoscopic Pericardiocentesis D Indications/Use • Relief of pericardial tamponade F • To obtain a sample of pericardial fl uid for diagnostic evaluation G',
  NULL,
  NULL,
  NULL,
  NULL,
  'P • Rupture of tympanic membrane • Injury to external ear canal R Further information on video-otoscopy can be found in the BSAVA Manual of Canine and Feline S Endoscopy and Endosurgery. U Oxygen therapy see • Nasal oxygen administration W Y Procedures in Small Animal Practice 163 Percutaneous endoscopic gastrostomy (PEG) A tube see • Gastrostomy tube placement – (a) endoscopic Pericardiocentesis D Indications/Use • Relief of pericardial tamponade F • To obtain a sample of pericardial fl uid for diagnostic evaluation G',
  NULL
) ON CONFLICT (procedure_id) DO NOTHING;

