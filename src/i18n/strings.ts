/**
 * Interface text in English and Vietnamese. Page content lives in each page file;
 * this file holds the words shared by every page (header, footer, buttons).
 * Licence names, numbers and regulator names stay in English on both languages
 * so they match the official records exactly.
 */
export type Lang = 'en' | 'vi';

export const strings = {
  en: {
    skip: 'Skip to content',
    call: 'Call',
    text: 'Send a text',
    switchLabel: 'Tiếng Việt',
    switchAria: 'Xem trang này bằng tiếng Việt (Vietnamese)',
    office: 'Office',
    site: 'Site',
    languages: 'English & Tiếng Việt',
    verifyNmls: 'Verify on NMLS Consumer Access',
    newTab: '(opens in a new tab)',
    mortgageVia: 'Mortgage loans arranged through',
    realEstate: 'Real estate services:',
    disclaimer:
      'This website is for information only and is not an offer to lend or a commitment to make a loan. All loans are subject to credit approval, property review and program guidelines. Rates, terms and programs change without notice.',
    ehoNote: '',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    mainNav: 'Main',
    footerNav: 'Footer',
  },
  vi: {
    skip: 'Chuyển đến nội dung',
    call: 'Gọi',
    text: 'Nhắn tin',
    switchLabel: 'English',
    switchAria: 'View this page in English',
    office: 'Văn phòng',
    site: 'Trang web',
    languages: 'Tiếng Việt & English',
    verifyNmls: 'Kiểm tra trên NMLS Consumer Access',
    newTab: '(mở trong thẻ mới)',
    mortgageVia: 'Khoản vay thế chấp được thực hiện qua',
    realEstate: 'Dịch vụ địa ốc:',
    disclaimer:
      'Trang web này chỉ nhằm cung cấp thông tin, không phải là lời đề nghị cho vay hay cam kết cấp khoản vay. Mọi khoản vay đều phải được xét duyệt tín dụng, thẩm định bất động sản và đáp ứng điều kiện của chương trình. Lãi suất, điều khoản và chương trình có thể thay đổi mà không cần báo trước.',
    ehoNote: 'Cơ hội Nhà ở Bình đẳng',
    home: 'Trang chủ',
    breadcrumb: 'Đường dẫn',
    mainNav: 'Chính',
    footerNav: 'Chân trang',
  },
} as const;

export const t = (lang: Lang) => strings[lang];

/** English path -> Vietnamese twin (/loans/fha/ -> /vi/loans/fha/), and back. */
export function viPath(enPath: string): string {
  return enPath === '/' ? '/vi/' : `/vi${enPath}`;
}
export function enPath(vi: string): string {
  return vi === '/vi/' ? '/' : vi.replace(/^\/vi/, '');
}
