/**
 * Trust pages: About Bao, Licenses & disclosures, Contact, Privacy.
 * Edit the wording here. Licence numbers come from src/config/site.ts.
 */
import { site, agent, brokerage, mortgageCompany, verifyLinks, formatPhone, telHref } from '../config/site';
import type { Lang } from '../i18n/strings';

export type InfoId = 'about' | 'licenses' | 'contact' | 'privacy';

export const infoPaths: Record<InfoId, string> = {
  about: '/about/bao-nguyen/',
  licenses: '/licenses/',
  contact: '/contact/',
  privacy: '/privacy/',
};

export interface InfoLink {
  label: string;
  href: string;
  external?: boolean;
}
export interface InfoSection {
  h2: string;
  p?: string[];
  list?: string[];
  links?: InfoLink[];
}
export interface InfoContent {
  path: string;
  title: string;
  description: string;
  crumb: string;
  h1: string;
  lead: string;
  sections: InfoSection[];
  updated: string;
  photo?: boolean;
  cta?: boolean;
}

const UPDATED = '2026-11-11';
const phone = formatPhone(agent.phone);
const addr = `${brokerage.address.street}, ${brokerage.address.city}, ${brokerage.address.region} ${brokerage.address.postalCode}`;
const vi = (p: string) => `/vi${p}`;

export const licenseLinks = {
  agentNmls: verifyLinks.nmls,
  agentDre: `https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=${agent.dreLicense}`,
  companyNmls: `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/${mortgageCompany.nmlsId}`,
  companyDre: `https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=${mortgageCompany.dreLicense}`,
  brokerageDre: `https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=${brokerage.dreLicense}`,
};

export function infoContent(id: InfoId, lang: Lang): InfoContent {
  const path = lang === 'vi' ? vi(infoPaths[id]) : infoPaths[id];
  const L = (p: string) => (lang === 'vi' ? vi(p) : p);
  const en = lang === 'en';

  if (id === 'about') {
    return en
      ? {
          path,
          title: 'About Bao Nguyen, Vietnamese Realtor and Loan Officer',
          description: `Bao Nguyen is a bilingual Vietnamese realtor and loan officer serving San Gabriel Valley families since 2017. DRE #${agent.dreLicense}, NMLS #${agent.nmlsId}.`,
          crumb: 'About Bao',
          h1: 'About Bao Nguyen, Vietnamese realtor and loan officer',
          lead: `Bao Nguyen is a Vietnamese realtor and loan officer who helps San Gabriel Valley families buy, sell and refinance homes, in English or Vietnamese.`,
          photo: true,
          cta: true,
          updated: UPDATED,
          sections: [
            {
              h2: 'Background',
              p: [
                'Bao has spent more than 10 years in banking and consulting. He joined Virchu Financial & Investment in 2017, where his banking background helps homeowners and real estate investors make sense of loan options before they commit.',
                'He grew up in Glendale, California, and is a UC Santa Barbara alumnus. Outside of work he skateboards, goes off-roading and takes long road trips.',
              ],
            },
            {
              h2: 'What Bao does',
              list: [
                'Refinance and cash-out refinance, arranged through a licensed mortgage broker that compares wholesale lenders',
                'Purchase loans for first-time and move-up buyers, including FHA and conventional',
                'Listing and selling homes as a seller’s agent',
                'Representing buyers through search, offer, inspection and closing',
              ],
              links: [
                { label: 'Loan officer services', href: L('/loan-officer/') },
                { label: 'Realtor services', href: L('/real-estate/') },
                { label: 'Cities Bao serves', href: L('/areas/') },
              ],
            },
            {
              h2: 'Licenses',
              p: [
                `Bao is a California DRE Broker Associate (license #${agent.dreLicense}) and a mortgage loan originator (NMLS #${agent.nmlsId}). You can check both records yourself.`,
              ],
              links: [
                { label: 'Bao on NMLS Consumer Access', href: licenseLinks.agentNmls, external: true },
                { label: 'Bao on the California DRE lookup', href: licenseLinks.agentDre, external: true },
                { label: 'All licenses and disclosures', href: L('/licenses/') },
              ],
            },
          ],
        }
      : {
          path,
          title: 'Về Bao Nguyen, Realtor và Chuyên viên Cho vay Người Việt',
          description: `Bao Nguyen là realtor và chuyên viên cho vay người Việt ở San Gabriel Valley, nói tiếng Việt và tiếng Anh. DRE #${agent.dreLicense}, NMLS #${agent.nmlsId}.`,
          crumb: 'Về Bao',
          h1: 'Về Bao Nguyen, realtor và chuyên viên cho vay người Việt',
          lead: 'Bao Nguyen là realtor và chuyên viên cho vay người Việt, giúp các gia đình ở San Gabriel Valley mua, bán và tái tài trợ nhà, bằng tiếng Việt hoặc tiếng Anh.',
          photo: true,
          cta: true,
          updated: UPDATED,
          sections: [
            {
              h2: 'Kinh nghiệm',
              p: [
                'Bao có hơn 10 năm làm việc trong ngành ngân hàng và tư vấn. Anh gia nhập Virchu Financial & Investment năm 2017, nơi kinh nghiệm ngân hàng giúp chủ nhà và nhà đầu tư hiểu rõ các lựa chọn vay trước khi quyết định.',
                'Anh lớn lên ở Glendale, California, và tốt nghiệp UC Santa Barbara. Ngoài công việc, anh thích trượt ván, lái xe địa hình và những chuyến đi đường dài.',
              ],
            },
            {
              h2: 'Bao giúp gì cho bạn',
              list: [
                'Tái tài trợ và rút tiền mặt từ nhà, qua công ty môi giới vay có giấy phép so sánh nhiều nhà cho vay bán sỉ',
                'Vay mua nhà cho người mua lần đầu và người đổi nhà, gồm FHA và vay thông thường',
                'Đăng bán và bán nhà với vai trò đại diện người bán',
                'Đại diện người mua từ lúc tìm nhà, ra giá, kiểm tra nhà đến khi hoàn tất',
              ],
              links: [
                { label: 'Dịch vụ cho vay', href: L('/loan-officer/') },
                { label: 'Dịch vụ realtor', href: L('/real-estate/') },
                { label: 'Các thành phố Bao phục vụ', href: L('/areas/') },
              ],
            },
            {
              h2: 'Giấy phép',
              p: [
                `Bao là Broker Associate được Sở Địa ốc California (DRE) cấp phép (số ${agent.dreLicense}) và là chuyên viên khởi tạo khoản vay (NMLS #${agent.nmlsId}). Bạn có thể tự kiểm tra cả hai hồ sơ.`,
              ],
              links: [
                { label: 'Hồ sơ của Bao trên NMLS Consumer Access', href: licenseLinks.agentNmls, external: true },
                { label: 'Hồ sơ của Bao trên trang tra cứu DRE California', href: licenseLinks.agentDre, external: true },
                { label: 'Tất cả giấy phép và công bố', href: L('/licenses/') },
              ],
            },
          ],
        };
  }

  if (id === 'licenses') {
    const rowsEn = [
      `${agent.name}, ${agent.title}: CA DRE #${agent.dreLicense}, NMLS #${agent.nmlsId}`,
      `${mortgageCompany.legalName}, dba ${mortgageCompany.dba}: NMLS #${mortgageCompany.nmlsId}, CA DRE #${mortgageCompany.dreLicense} (real estate corporation with a mortgage loan originator endorsement)`,
      `${brokerage.legalName}, dba ${brokerage.name}: CA DRE #${brokerage.dreLicense} (real estate brokerage; designated broker ${brokerage.broker})`,
    ];
    const rowsVi = [
      `${agent.name}, ${agent.title}: DRE California #${agent.dreLicense}, NMLS #${agent.nmlsId}`,
      `${mortgageCompany.legalName}, dba ${mortgageCompany.dba}: NMLS #${mortgageCompany.nmlsId}, DRE California #${mortgageCompany.dreLicense} (công ty địa ốc có chứng nhận khởi tạo khoản vay)`,
      `${brokerage.legalName}, dba ${brokerage.name}: DRE California #${brokerage.dreLicense} (công ty môi giới địa ốc; broker phụ trách ${brokerage.broker})`,
    ];
    const lookups = (labels: string[]): InfoLink[] => [
      { label: labels[0], href: licenseLinks.agentNmls, external: true },
      { label: labels[1], href: licenseLinks.agentDre, external: true },
      { label: labels[2], href: licenseLinks.companyNmls, external: true },
      { label: labels[3], href: licenseLinks.companyDre, external: true },
      { label: labels[4], href: licenseLinks.brokerageDre, external: true },
    ];
    return en
      ? {
          path,
          title: 'Licenses and Disclosures',
          description: `License numbers for Bao Nguyen (DRE #${agent.dreLicense}, NMLS #${agent.nmlsId}), ${mortgageCompany.legalName} and ${brokerage.legalName}, with links to check each record.`,
          crumb: 'Licenses',
          h1: 'Licenses and disclosures',
          lead: 'Every license behind this website, with a link to check it on the official state or NMLS record.',
          updated: UPDATED,
          sections: [
            { h2: 'Who is licensed', list: rowsEn },
            {
              h2: 'Check the records yourself',
              p: ['These links open the official lookups. NMLS may ask you to accept its terms first.'],
              links: lookups([
                `Bao Nguyen, NMLS #${agent.nmlsId}`,
                `Bao Nguyen, DRE #${agent.dreLicense}`,
                `${mortgageCompany.legalName}, NMLS #${mortgageCompany.nmlsId}`,
                `${mortgageCompany.legalName}, DRE #${mortgageCompany.dreLicense}`,
                `${brokerage.legalName}, DRE #${brokerage.dreLicense}`,
              ]),
            },
            {
              h2: 'Important disclosures',
              list: [
                `Mortgage loans are arranged through ${mortgageCompany.legalName}, dba ${mortgageCompany.dba}. ${mortgageCompany.regulator}.`,
                `Real estate services are provided through ${brokerage.legalName}, dba ${brokerage.name}.`,
                'This site does not quote interest rates. Rates, terms and approval depend on credit, income, property and market conditions. Nothing here is a commitment to lend.',
                'Loan limits and down payment programs shown on this site come from public sources linked next to each figure, with the date they were checked.',
                'Equal Housing Opportunity. We do business in accordance with the Fair Housing Act and the Equal Credit Opportunity Act.',
              ],
            },
          ],
        }
      : {
          path,
          title: 'Giấy phép và Công bố',
          description: `Số giấy phép của Bao Nguyen (DRE #${agent.dreLicense}, NMLS #${agent.nmlsId}), ${mortgageCompany.legalName} và ${brokerage.legalName}, kèm đường dẫn để kiểm tra.`,
          crumb: 'Giấy phép',
          h1: 'Giấy phép và công bố',
          lead: 'Tất cả giấy phép đứng sau trang web này, kèm đường dẫn để bạn kiểm tra trên hồ sơ chính thức của tiểu bang hoặc NMLS.',
          updated: UPDATED,
          sections: [
            { h2: 'Ai được cấp phép', list: rowsVi },
            {
              h2: 'Tự kiểm tra hồ sơ',
              p: ['Các đường dẫn này mở trang tra cứu chính thức (tiếng Anh). NMLS có thể yêu cầu bạn đồng ý điều khoản trước.'],
              links: lookups([
                `Bao Nguyen, NMLS #${agent.nmlsId}`,
                `Bao Nguyen, DRE #${agent.dreLicense}`,
                `${mortgageCompany.legalName}, NMLS #${mortgageCompany.nmlsId}`,
                `${mortgageCompany.legalName}, DRE #${mortgageCompany.dreLicense}`,
                `${brokerage.legalName}, DRE #${brokerage.dreLicense}`,
              ]),
            },
            {
              h2: 'Công bố quan trọng',
              list: [
                `Khoản vay được thu xếp qua ${mortgageCompany.legalName}, dba ${mortgageCompany.dba}, được Sở Địa ốc California cấp phép.`,
                `Dịch vụ địa ốc được cung cấp qua ${brokerage.legalName}, dba ${brokerage.name}.`,
                'Trang này không báo lãi suất. Lãi suất, điều kiện và việc duyệt vay tùy vào tín dụng, thu nhập, căn nhà và thị trường. Không nội dung nào ở đây là cam kết cho vay.',
                'Hạn mức vay và chương trình hỗ trợ tiền trả trước trên trang này lấy từ nguồn công khai, có đường dẫn và ngày kiểm tra bên cạnh mỗi con số.',
                'Cơ hội Nhà ở Bình đẳng. Chúng tôi tuân thủ Đạo luật Nhà ở Công bằng và Đạo luật Cơ hội Tín dụng Bình đẳng.',
              ],
            },
          ],
        };
  }

  if (id === 'contact') {
    return en
      ? {
          path,
          title: 'Contact Bao Nguyen, SGV Loan Officer and Realtor',
          description: `Call Bao Nguyen at ${phone} or email ${agent.email}. Office at ${addr}. English and Vietnamese.`,
          crumb: 'Contact',
          h1: 'Contact Bao Nguyen',
          lead: 'Call, text or email Bao in English or Vietnamese. There is no cost to ask questions or compare options.',
          cta: true,
          updated: UPDATED,
          sections: [
            {
              h2: 'Phone and email',
              links: [
                { label: `Call or text ${phone}`, href: telHref(agent.phone) },
                { label: `Email ${agent.email}`, href: `mailto:${agent.email}` },
              ],
            },
            { h2: 'Office', p: [`${brokerage.name}, ${addr}. Please call ahead; Bao often meets clients at their home or by phone.`] },
            {
              h2: 'What to have ready',
              list: [
                'For a refinance: your latest mortgage statement and a rough idea of your home’s value',
                'For a purchase: your price range, the cities you like and how much you have saved',
                'For a sale: the address and when you would like to move',
              ],
            },
          ],
        }
      : {
          path,
          title: 'Liên hệ Bao Nguyen, Chuyên viên Cho vay và Realtor',
          description: `Gọi Bao Nguyen số ${phone} hoặc email ${agent.email}. Văn phòng tại ${addr}. Tiếng Việt và tiếng Anh.`,
          crumb: 'Liên hệ',
          h1: 'Liên hệ Bao Nguyen',
          lead: 'Gọi, nhắn tin hoặc email cho Bao bằng tiếng Việt hoặc tiếng Anh. Hỏi đáp và so sánh lựa chọn đều miễn phí.',
          cta: true,
          updated: UPDATED,
          sections: [
            {
              h2: 'Điện thoại và email',
              links: [
                { label: `Gọi hoặc nhắn tin ${phone}`, href: telHref(agent.phone) },
                { label: `Email ${agent.email}`, href: `mailto:${agent.email}` },
              ],
            },
            { h2: 'Văn phòng', p: [`${brokerage.name}, ${addr}. Vui lòng gọi trước; Bao thường gặp khách tại nhà hoặc qua điện thoại.`] },
            {
              h2: 'Nên chuẩn bị gì',
              list: [
                'Tái tài trợ: bản sao kê khoản vay gần nhất và giá trị ước tính của căn nhà',
                'Mua nhà: tầm giá, các thành phố bạn thích và số tiền đã để dành',
                'Bán nhà: địa chỉ và thời điểm bạn muốn dọn đi',
              ],
            },
          ],
        };
  }

  // privacy
  const analytics = Boolean(site.ga4Id);
  return en
    ? {
        path,
        title: 'Privacy Policy',
        description: 'How San Gabriel Valley Mortgage Broker handles your information: what this site collects, why, how it is used, and how to ask us to delete it.',
        crumb: 'Privacy',
        h1: 'Privacy policy',
        lead: 'This website is built to collect as little about you as possible.',
        updated: UPDATED,
        sections: [
          {
            h2: 'What this site collects',
            list: [
              analytics
                ? 'Google Analytics 4 measures visits only if you agree in the cookie notice. If you decline, no analytics cookies are set.'
                : 'This site does not use analytics, advertising trackers or cookies.',
              'Our hosting provider, Cloudflare, processes basic request data such as IP address and browser type to deliver pages and block attacks.',
              'The site has no forms. If you call, text or email Bao, he receives the details you choose to share.',
            ],
          },
          {
            h2: 'How your information is used',
            p: ['Information you share is used only to answer your question or help with your home or loan. It is not sold. A loan application is handled under the lender’s own privacy notice, which you receive when you apply.'],
          },
          {
            h2: 'Your choices',
            p: [`California residents may ask what personal information we hold about them and ask us to delete it. Contact Bao at ${agent.email} or ${phone}.`],
          },
        ],
      }
    : {
        path,
        title: 'Chính sách Quyền riêng tư',
        description: 'Cách San Gabriel Valley Mortgage Broker xử lý thông tin của bạn: trang web thu thập gì, vì sao, dùng thế nào và cách yêu cầu xóa thông tin.',
        crumb: 'Quyền riêng tư',
        h1: 'Chính sách quyền riêng tư',
        lead: 'Trang web này được xây dựng để thu thập ít thông tin về bạn nhất có thể.',
        updated: UPDATED,
        sections: [
          {
            h2: 'Trang web thu thập gì',
            list: [
              analytics
                ? 'Google Analytics 4 chỉ đo lượt truy cập nếu bạn đồng ý trong thông báo cookie. Nếu bạn từ chối, không có cookie phân tích nào được đặt.'
                : 'Trang này không dùng công cụ phân tích, theo dõi quảng cáo hay cookie.',
              'Nhà cung cấp lưu trữ Cloudflare xử lý dữ liệu cơ bản như địa chỉ IP và loại trình duyệt để hiển thị trang và chặn tấn công.',
              'Trang không có biểu mẫu. Nếu bạn gọi, nhắn tin hoặc email cho Bao, anh nhận được những thông tin bạn chọn chia sẻ.',
            ],
          },
          {
            h2: 'Thông tin được dùng thế nào',
            p: ['Thông tin bạn chia sẻ chỉ dùng để trả lời câu hỏi hoặc giúp bạn về nhà và khoản vay. Không bán thông tin. Hồ sơ vay được xử lý theo thông báo quyền riêng tư của nhà cho vay, bạn sẽ nhận khi nộp hồ sơ.'],
          },
          {
            h2: 'Quyền của bạn',
            p: [`Cư dân California có thể hỏi chúng tôi đang giữ thông tin cá nhân nào về họ và yêu cầu xóa. Liên hệ Bao qua ${agent.email} hoặc ${phone}.`],
          },
        ],
      };
}

export function infoFooterLinks(lang: Lang) {
  const ids: InfoId[] = ['about', 'contact', 'licenses', 'privacy'];
  return ids.map((id) => {
    const c = infoContent(id, lang);
    return { label: c.crumb, href: c.path };
  });
}
