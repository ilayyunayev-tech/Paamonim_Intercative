import { AlignmentType, Document, LevelFormat, Packer, Paragraph, TextRun } from 'docx';
import type { IRunOptions } from 'docx';

/** Plain shape passed from legacy JS (no TS there) */
export type CvEducation = {
  degree: string;
  institution: string;
  years: string;
};

export type CvExperience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type CvSkill = {
  name: string;
  level: number;
};

export type CvState = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: CvEducation[];
  experience: CvExperience[];
  skills: CvSkill[];
};

const FONT = 'Arial';
const PRIMARY_HEX = '5B3F95';
const SECONDARY_HEX = '4A9FD8';
const MUTED_HEX = '5E6472';

const BULLET_REF = 'cv-bullet-rtl';

function heRun(text: string, opts: Partial<Omit<IRunOptions, 'text'>> = {}): TextRun {
  const t = (text ?? '').toString();
  return new TextRun({
    text: t,
    font: FONT,
    ...opts,
  });
}

function rtlParagraph(children: TextRun[], extra?: { spacing?: { before?: number; after?: number } }): Paragraph {
  return new Paragraph({
    children,
    bidirectional: true,
    alignment: AlignmentType.RIGHT,
    spacing: extra?.spacing ?? { after: 120 },
  });
}

function sectionTitle(text: string): Paragraph {
  return rtlParagraph(
    [
      heRun(text, {
        bold: true,
        size: 28,
        color: PRIMARY_HEX,
      }),
    ],
    { spacing: { before: 240, after: 120 } },
  );
}

function bodyParagraph(text: string): Paragraph {
  return rtlParagraph(
    [
      heRun(text, {
        size: 24,
        color: '2C2C2C',
      }),
    ],
    { spacing: { after: 160 } },
  );
}

function contactLine(state: CvState): Paragraph {
  const parts: string[] = [];
  if (state.phone?.trim()) parts.push(state.phone.trim());
  if (state.email?.trim()) parts.push(state.email.trim());
  if (state.location?.trim()) parts.push(state.location.trim());
  const line = parts.join(' · ');
  return rtlParagraph(
    [
      heRun(line, {
        size: 22,
        color: MUTED_HEX,
      }),
    ],
    { spacing: { after: 200 } },
  );
}

function skillDots(level: number): string {
  const n = Math.max(0, Math.min(5, Math.round(Number(level) || 0)));
  return '●'.repeat(n) + '○'.repeat(5 - n);
}

export const CV_MOCK_STATE: CvState = {
  fullName: 'דניאל לוי',
  title: 'מעצב מוצר בכיר | מפתח Full Stack',
  email: 'daniel.levi@email.com',
  phone: '054-1234567',
  location: 'תל אביב, ישראל',
  summary:
    'מעצב מוצר ומפתח בעל ניסיון של מעל 5 שנים בבניית ממשקים מורכבים. מומחה ב-React, TypeScript ו-Node.js; שילוב טכנולוגיות קצה עם חוויית משתמש אינטואיטיבית. סכומים לדוגמה: ₪12,500, 17%, 2020–נוכחי. משפט עם סימני פיסוק: "דיוק, מהירות, ושיתוף פעולה — זה מה שמוביל לתוצאה."',
  education: [
    {
      degree: 'תואר ראשון במדעי המחשב',
      institution: 'אוניברסיטת תל אביב',
      years: '2016 – 2020',
    },
    {
      degree: 'בוגר קורס UI/UX מתקדם',
      institution: 'HackerU',
      years: '2015',
    },
  ],
  experience: [
    {
      company: 'StartupX',
      role: 'מעצב מוצר בכיר',
      period: '2020 – נוכחי',
      bullets: [
        'הובלת תהליכי Design-to-Code תוך שימוש ב-React ו-Tailwind.',
        'בניית מערכת עיצוב (Design System) שחסכה כ-30% מזמן הפיתוח.',
        'עבודה עם צוותים חוצי-ארגון: מוצר, הנדסה, ושיווק.',
      ],
    },
    {
      company: 'Digital Solutions',
      role: 'מפתח Web',
      period: '2018 – 2020',
      bullets: [
        'פיתוח ממשקי משתמש רספונסיביים עבור לקוחות בינלאומיים.',
        'אופטימיזציה לביצועים (Core Web Vitals) ושיפור נגישות (WCAG).',
      ],
    },
  ],
  skills: [
    { name: 'React & Tailwind', level: 4 },
    { name: 'Figma & Design', level: 5 },
    { name: 'Node.js', level: 3 },
    { name: 'מודעות למוצר (Product Thinking)', level: 4 },
  ],
};

export async function buildCvDocxBlob(state: CvState): Promise<Blob> {
  const children: Paragraph[] = [];

  children.push(
    rtlParagraph(
      [
        heRun(state.fullName || ' ', {
          bold: true,
          size: 56,
          color: PRIMARY_HEX,
        }),
      ],
      { spacing: { after: 80 } },
    ),
  );

  if (state.title?.trim()) {
    children.push(
      rtlParagraph(
        [
          heRun(state.title.trim(), {
            size: 28,
            color: SECONDARY_HEX,
            italics: true,
          }),
        ],
        { spacing: { after: 120 } },
      ),
    );
  }

  children.push(contactLine(state));

  children.push(sectionTitle('תמצית'));
  children.push(bodyParagraph(state.summary || ''));

  children.push(sectionTitle('ניסיון תעסוקתי'));
  (state.experience || []).forEach((exp) => {
    const head = `${exp.role || ''} — ${exp.company || ''}`.trim();
    const sub = exp.period || '';
    if (head) {
      children.push(
        rtlParagraph(
          [
            heRun(head, { bold: true, size: 26, color: '2C2C2C' }),
          ],
          { spacing: { after: 40 } },
        ),
      );
    }
    if (sub) {
      children.push(
        rtlParagraph(
          [
            heRun(sub, { size: 22, color: MUTED_HEX, italics: true }),
          ],
          { spacing: { after: 80 } },
        ),
      );
    }
    (exp.bullets || []).forEach((b) => {
      const line = (b || '').trim();
      if (!line) return;
      children.push(
        new Paragraph({
          bidirectional: true,
          alignment: AlignmentType.RIGHT,
          spacing: { after: 100 },
          numbering: { reference: BULLET_REF, level: 0 },
          children: [
            heRun(line, {
              size: 24,
              color: '2C2C2C',
            }),
          ],
        }),
      );
    });
  });

  children.push(sectionTitle('השכלה'));
  (state.education || []).forEach((ed) => {
    const t1 = (ed.degree || '').trim();
    const t2 = (ed.institution || '').trim();
    const t3 = (ed.years || '').trim();
    if (t1) {
      children.push(
        rtlParagraph(
          [
            heRun(t1, { bold: true, size: 24 }),
          ],
          { spacing: { after: 40 } },
        ),
      );
    }
    if (t2) {
      children.push(
        rtlParagraph(
          [
            heRun(t2, { size: 22, color: MUTED_HEX }),
          ],
          { spacing: { after: 40 } },
        ),
      );
    }
    if (t3) {
      children.push(
        rtlParagraph(
          [
            heRun(t3, { size: 20, color: MUTED_HEX, italics: true }),
          ],
          { spacing: { after: 160 } },
        ),
      );
    }
  });

  children.push(sectionTitle('כישורים'));
  (state.skills || []).forEach((sk) => {
    const name = (sk.name || '').trim();
    if (!name) return;
    const line = `${name}  ${skillDots(sk.level)}`;
    children.push(
      rtlParagraph(
        [
          heRun(line, { size: 24 }),
        ],
        { spacing: { after: 100 } },
      ),
    );
  });

  const doc = new Document({
    creator: 'פעמונים',
    title: state.fullName || 'קורות חיים',
    description: 'קורות חיים — ייצוא מקומי',
    styles: {
      default: {
        document: {
          run: {
            font: FONT,
          },
          paragraph: {
            spacing: { line: 276 },
          },
        },
      },
    },
    numbering: {
      config: [
        {
          reference: BULLET_REF,
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.RIGHT,
              style: {
                paragraph: {
                  indent: { left: 0, right: 360, hanging: 200 },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBlob(doc);
}

declare global {
  interface Window {
    PaamonimCvDocx?: {
      buildCvDocxBlob: (state: CvState) => Promise<Blob>;
      CV_MOCK_STATE: CvState;
    };
  }
}

export function exposeCvDocxOnWindow(): void {
  window.PaamonimCvDocx = {
    buildCvDocxBlob,
    CV_MOCK_STATE,
  };
}
