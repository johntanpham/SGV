/**
 * Service pages (English + Vietnamese). Short, factual, with CTA bands between sections.
 * Each page: the H1 and the first words of the intro use the same keyword.
 * Numbers come from src/data (Census, loan limits, LA County HOP) so they stay in sync.
 */
import { loanLimits, hop, calhfa } from '../data/loan-limits';
import { citiesBySlug } from '../data/cities';
import { usd } from '../i18n/city-copy';
import type { Lang } from '../i18n/strings';

export type Block =
  | { kind: 'section'; h2: string; p?: string[]; list?: string[]; steps?: string[]; link?: { href: string; label: string } }
  | { kind: 'cta'; text: string };

export interface ServiceContent {
  path: string;
  crumb: string;
  parent?: { name: string; path: string };
  title: string;
  description: string;
  h1: string;
  lead: string;
  serviceType: string;
  blocks: Block[];
  faqH2: string;
  faq: [string, string][];
  related: { href: string; label: string }[];
  relatedH2: string;
}

const c = citiesBySlug;
const minV = usd(c['el-monte'].medianValue);
const maxV = usd(c['arcadia'].medianValue);
const lim = usd(loanLimits.conforming.oneUnit);
const hop80 = usd(hop.hop80Max);

const P = {
  en: {
    realtor: '/real-estate/',
    sell: '/real-estate/sell/',
    buy: '/real-estate/buy/',
    loan: '/loan-officer/',
    areas: '/areas/',
  },
  vi: {
    realtor: '/vi/real-estate/',
    sell: '/vi/real-estate/sell/',
    buy: '/vi/real-estate/buy/',
    loan: '/vi/loan-officer/',
    areas: '/vi/areas/',
  },
};

export function serviceLinks(lang: Lang) {
  const p = P[lang];
  return lang === 'vi'
    ? [
        { href: p.realtor, label: 'Realtor người Việt SGV' },
        { href: p.sell, label: 'Môi giới bán nhà' },
        { href: p.buy, label: 'Môi giới mua nhà' },
        { href: p.loan, label: 'Chuyên viên cho vay' },
      ]
    : [
        { href: p.realtor, label: 'SGV Vietnamese realtor' },
        { href: p.sell, label: "Seller's agent" },
        { href: p.buy, label: "Buyer's agent" },
        { href: p.loan, label: 'Loan officer' },
      ];
}

export function serviceContent(id: 'realtor' | 'sell' | 'buy' | 'loan', lang: Lang): ServiceContent {
  const p = P[lang];
  const vi = lang === 'vi';

  if (id === 'realtor') {
    return vi
      ? {
          path: p.realtor,
          crumb: 'Realtor người Việt',
          title: 'Realtor người Việt ở San Gabriel Valley | Bao Nguyen',
          description: 'Realtor người Việt ở San Gabriel Valley, Bao Nguyen giúp bạn mua hoặc bán nhà, với khoản vay do cùng một người có giấy phép lo. Tiếng Việt hoặc tiếng Anh.',
          h1: 'Realtor người Việt ở San Gabriel Valley',
          lead: 'Realtor người Việt ở San Gabriel Valley, Bao Nguyen giúp các gia đình mua và bán nhà ở Alhambra, Rosemead, San Gabriel, El Monte và khắp thung lũng, bằng tiếng Việt hoặc tiếng Anh. Anh cũng là chuyên viên cho vay có giấy phép, nên việc tìm nhà và khoản vay do cùng một người lo.',
          serviceType: 'Real estate agent',
          blocks: [
            { kind: 'cta', text: 'Muốn mua hay bán nhà? Gọi hoặc nhắn tin cho Bao.' },
            { kind: 'section', h2: 'Bán nhà', p: ['Định giá dựa trên các căn nhà bán gần đây, chuẩn bị và quảng cáo căn nhà, và thương lượng giá. Xem cách tôi làm việc với tư cách môi giới bán nhà.'], link: { href: p.sell, label: 'Môi giới bán nhà ở San Gabriel Valley' } },
            { kind: 'section', h2: 'Mua nhà', p: ['Duyệt trước, đi xem nhà, đặt giá và thương lượng, với khoản vay được lo song song.'], link: { href: p.buy, label: 'Môi giới mua nhà ở San Gabriel Valley' } },
            { kind: 'section', h2: 'Vì sao một người lo cả nhà lẫn khoản vay', list: ['Thư duyệt trước do chính người soạn giá mua viết, nên người bán tin tưởng hơn.', 'Ít người trung gian, nên bạn có câu trả lời nhanh về lãi suất, tiền trả hàng tháng và chi phí.', 'Nếu bạn vừa bán vừa mua, cả hai giao dịch được lên kế hoạch cùng lúc.'] },
            { kind: 'cta', text: 'Nói chuyện với Bao bằng tiếng Việt, miễn phí.' },
            { kind: 'section', h2: 'Giá nhà ở San Gabriel Valley', p: [`Giá trị nhà trung vị dao động từ ${minV} ở El Monte đến ${maxV} ở Arcadia (Cục Thống kê Hoa Kỳ, ACS 2020-2024).`], link: { href: p.areas, label: 'Xem số liệu từng thành phố' } },
            { kind: 'section', h2: 'Phục vụ bằng tiếng Việt', p: [`Ở Rosemead, gần 1 trong 5 cư dân là người Mỹ gốc Việt (${c.rosemead.vietnamese!.pct}%), và ở San Gabriel cùng El Monte là hơn 1 trong 10. Bao giải thích hợp đồng, giấy tờ công bố và báo cáo kiểm tra nhà bằng tiếng Việt để bạn hiểu rõ từng điều.`] },
          ],
          faqH2: 'Câu hỏi thường gặp',
          faq: [
            ['Bạn có tính phí cao hơn vì lo luôn khoản vay không?', 'Không. Hoa hồng địa ốc và chi phí khoản vay là hai phần riêng và được thỏa thuận bằng văn bản. Hoa hồng có thể thương lượng và không do luật ấn định.'],
            ['Nếu bạn là realtor của tôi, tôi có bắt buộc vay qua bạn không?', 'Không. Bạn có thể vay ở bất kỳ đâu. Nhiều khách thích có cả hai ở một chỗ, nhưng quyết định luôn là của bạn.'],
            ['Bạn phục vụ những thành phố nào?', 'Toàn bộ San Gabriel Valley, gồm Alhambra, Monterey Park, San Gabriel, Rosemead, Temple City, El Monte, Arcadia và West Covina.'],
          ],
          relatedH2: 'Dịch vụ liên quan',
          related: [
            { href: p.sell, label: 'Môi giới bán nhà' },
            { href: p.buy, label: 'Môi giới mua nhà' },
            { href: p.loan, label: 'Chuyên viên cho vay' },
            { href: p.areas, label: 'Khu vực phục vụ' },
          ],
        }
      : {
          path: p.realtor,
          crumb: 'Vietnamese realtor',
          title: 'San Gabriel Valley Vietnamese Realtor | Bao Nguyen',
          description: 'San Gabriel Valley Vietnamese realtor Bao Nguyen helps you buy or sell a home, with financing from the same licensed person. In Tiếng Việt or English.',
          h1: 'San Gabriel Valley Vietnamese Realtor',
          lead: 'San Gabriel Valley Vietnamese realtor Bao Nguyen helps families buy and sell homes in Alhambra, Rosemead, San Gabriel, El Monte and across the valley, in Tiếng Việt or English. He is also a licensed loan officer, so your home search and your financing are handled by one person.',
          serviceType: 'Real estate agent',
          blocks: [
            { kind: 'cta', text: 'Buying or selling? Call or text Bao.' },
            { kind: 'section', h2: 'Selling a home', p: ['Pricing from recent sales, preparing and marketing your home, and negotiating offers.'], link: { href: p.sell, label: 'San Gabriel Valley seller’s agent' } },
            { kind: 'section', h2: 'Buying a home', p: ['Pre-approval, home tours, offers and negotiation, with your loan handled alongside.'], link: { href: p.buy, label: 'San Gabriel Valley buyer’s agent' } },
            { kind: 'section', h2: 'Why one person for the home and the loan', list: ['Your pre-approval is written by the person writing your offer, which sellers trust.', 'Fewer handoffs, so you get fast answers on rate, payment and closing costs.', 'If you are selling and buying, both sides are planned together.'] },
            { kind: 'cta', text: 'Free consultation, in Vietnamese or English.' },
            { kind: 'section', h2: 'Home values across the San Gabriel Valley', p: [`Median home values range from ${minV} in El Monte to ${maxV} in Arcadia (U.S. Census, ACS 2020-2024).`], link: { href: p.areas, label: 'See data for each city' } },
            { kind: 'section', h2: 'Service in Vietnamese', p: [`In Rosemead, nearly one in five residents is Vietnamese American (${c.rosemead.vietnamese!.pct}%), and in San Gabriel and El Monte more than one in ten. Bao explains contracts, disclosures and inspection reports in Vietnamese so nothing is lost in translation.`] },
          ],
          faqH2: 'Frequently asked questions',
          faq: [
            ['Do you charge more because you also do the loan?', 'No. The real estate commission and the loan costs are separate and agreed in writing. Commissions are negotiable and are not set by law.'],
            ['If you are my realtor, do I have to get my loan through you?', 'No. You can use any lender. Many clients like having both in one place, but the choice is always yours.'],
            ['Which cities do you cover?', 'The whole San Gabriel Valley, including Alhambra, Monterey Park, San Gabriel, Rosemead, Temple City, El Monte, Arcadia and West Covina.'],
          ],
          relatedH2: 'Related services',
          related: [
            { href: p.sell, label: 'Seller’s agent' },
            { href: p.buy, label: 'Buyer’s agent' },
            { href: p.loan, label: 'Loan officer' },
            { href: p.areas, label: 'Areas served' },
          ],
        };
  }

  if (id === 'sell') {
    return vi
      ? {
          path: p.sell,
          crumb: 'Môi giới bán nhà',
          parent: { name: 'Realtor người Việt', path: p.realtor },
          title: 'Môi giới bán nhà ở San Gabriel Valley | Bao Nguyen',
          description: 'Môi giới bán nhà ở San Gabriel Valley, Bao Nguyen định giá, quảng cáo và thương lượng bán căn nhà của bạn, bằng tiếng Việt. Xem dịch vụ gồm những gì.',
          h1: 'Môi giới bán nhà ở San Gabriel Valley',
          lead: 'Môi giới bán nhà ở San Gabriel Valley, Bao Nguyen giúp bạn định giá, chuẩn bị, quảng cáo và bán căn nhà, và nếu bạn mua căn kế tiếp, anh lo luôn khoản vay cho bước đó.',
          serviceType: "Seller's agent",
          blocks: [
            { kind: 'cta', text: 'Nhận bản định giá miễn phí cho căn nhà của bạn.' },
            { kind: 'section', h2: 'Dịch vụ gồm những gì', list: ['Định giá dựa trên các căn nhà tương tự bán gần đây trong khu bạn ở.', 'Kế hoạch chuẩn bị: sửa gì đáng tiền, bỏ qua gì, dàn dựng và chụp ảnh.', 'Đăng lên MLS, hệ thống đưa tin lên Zillow, Redfin và Realtor.com.', 'Dẫn khách xem nhà, xem xét giá đề nghị và thương lượng.', 'Theo dõi escrow, kiểm tra nhà, thẩm định giá và giấy tờ công bố đến ngày đóng.'] },
            { kind: 'section', h2: 'Quy trình bán nhà', steps: ['Tư vấn định giá miễn phí', 'Chuẩn bị căn nhà', 'Đăng bán và quảng cáo', 'Xem giá đề nghị và thương lượng', 'Escrow và hoàn tất giao dịch'] },
            { kind: 'cta', text: 'Muốn biết nhà mình bán được bao nhiêu? Gọi Bao.' },
            { kind: 'section', h2: 'Vừa bán vừa mua', p: ['Nhiều người bán nhà ở thung lũng cũng đang mua căn khác. Vì Bao là chuyên viên cho vay có giấy phép, anh có thể giúp bạn được duyệt trước cho căn kế tiếp trước khi đăng bán, và sắp xếp thời gian hai escrow để bạn không bị kẹt giữa hai căn nhà.'] },
            { kind: 'section', h2: 'Nhà bạn đáng giá bao nhiêu', p: ['Xem giá trị nhà trung vị theo từng thành phố, hoặc nhận bản phân tích thị trường miễn phí dựa trên các căn bán gần nhà bạn.'], link: { href: p.areas, label: 'Giá nhà theo thành phố' } },
          ],
          faqH2: 'Câu hỏi thường gặp',
          faq: [
            ['Bán nhà tốn bao nhiêu?', 'Hoa hồng có thể thương lượng, được ghi bằng văn bản trước khi đăng bán, và không do luật ấn định. Người bán thường trả thêm phí escrow, title và thuế chuyển nhượng. Bao đưa bạn bảng ước tính số tiền thực nhận trước khi đăng bán.'],
            ['Bạn có quảng cáo nhà bằng cả tiếng Việt và tiếng Anh không?', 'Có. Bao trao đổi với bạn bằng tiếng Việt và giới thiệu căn nhà đến người mua bằng cả hai ngôn ngữ.'],
            ['Tôi có phải sửa hết mọi thứ trước khi bán không?', 'Không. Bao giúp bạn quyết định sửa gì đáng tiền và bỏ qua gì, và bạn cũng có thể bán nguyên trạng.'],
          ],
          relatedH2: 'Dịch vụ liên quan',
          related: [
            { href: p.buy, label: 'Môi giới mua nhà' },
            { href: p.loan, label: 'Chuyên viên cho vay' },
            { href: p.realtor, label: 'Realtor người Việt' },
          ],
        }
      : {
          path: p.sell,
          crumb: 'Seller’s agent',
          parent: { name: 'Vietnamese realtor', path: p.realtor },
          title: 'San Gabriel Valley Seller’s Agent | Sell Your Home',
          description: 'San Gabriel Valley seller’s agent Bao Nguyen prices, markets and negotiates the sale of your home, in Vietnamese or English. See what is included.',
          h1: 'San Gabriel Valley Seller’s Agent',
          lead: 'San Gabriel Valley seller’s agent Bao Nguyen helps you price, prepare, market and sell your home, and if you are buying next, he lines up the financing for that move too.',
          serviceType: "Seller's agent",
          blocks: [
            { kind: 'cta', text: 'Get a free price estimate for your home.' },
            { kind: 'section', h2: 'What’s included', list: ['Pricing based on recent comparable sales in your neighborhood.', 'A prep plan: repairs worth making, ones to skip, staging and photos.', 'Listing on the MLS, which feeds Zillow, Redfin and Realtor.com.', 'Showings, offer review and negotiation.', 'Managing escrow, inspections, appraisal and disclosures through closing.'] },
            { kind: 'section', h2: 'How selling works', steps: ['Free pricing consultation', 'Prepare the home', 'List and market', 'Review offers and negotiate', 'Escrow and closing'] },
            { kind: 'cta', text: 'Wondering what your home would sell for? Call Bao.' },
            { kind: 'section', h2: 'Selling and buying at the same time', p: ['Many sellers in the valley are also buying. Because Bao is a licensed loan officer, he can get you pre-approved for the next home before you list, and plan the timing of both escrows so you are not stuck between homes.'] },
            { kind: 'section', h2: 'What your home is worth', p: ['See median home values for each city, or get a free market analysis based on recent sales near you.'], link: { href: p.areas, label: 'Home values by city' } },
          ],
          faqH2: 'Frequently asked questions',
          faq: [
            ['How much does it cost to sell?', 'Commission is negotiable, agreed in writing before listing, and not set by law. Sellers also usually pay escrow, title and transfer-tax costs. Bao gives you an estimated net sheet before you list.'],
            ['Can you market my home in Vietnamese and English?', 'Yes. Bao works with you in Vietnamese and presents the home to buyers in both languages.'],
            ['Do I need to fix everything before selling?', 'No. Bao helps you decide which repairs pay off and which to skip, and you can also sell as-is.'],
          ],
          relatedH2: 'Related services',
          related: [
            { href: p.buy, label: 'Buyer’s agent' },
            { href: p.loan, label: 'Loan officer' },
            { href: p.realtor, label: 'Vietnamese realtor' },
          ],
        };
  }

  if (id === 'buy') {
    const hopCities = 'Arcadia, San Gabriel, Temple City';
    return vi
      ? {
          path: p.buy,
          crumb: 'Môi giới mua nhà',
          parent: { name: 'Realtor người Việt', path: p.realtor },
          title: 'Môi giới mua nhà ở San Gabriel Valley | Bao Nguyen',
          description: 'Môi giới mua nhà ở San Gabriel Valley, Bao Nguyen giúp bạn được duyệt trước, tìm nhà và đặt giá thành công, với khoản vay lo tại chỗ. Tiếng Việt hoặc tiếng Anh.',
          h1: 'Môi giới mua nhà ở San Gabriel Valley',
          lead: 'Môi giới mua nhà ở San Gabriel Valley, Bao Nguyen giúp bạn được duyệt trước, tìm đúng căn nhà và thương lượng giá mua, và vì anh cũng là chuyên viên cho vay có giấy phép, khoản vay của bạn do cùng một người lo.',
          serviceType: "Buyer's agent",
          blocks: [
            { kind: 'cta', text: 'Bắt đầu với buổi tư vấn miễn phí.' },
            { kind: 'section', h2: 'Dịch vụ gồm những gì', list: ['Duyệt trước và ngân sách hàng tháng rõ ràng trước khi đi xem nhà.', 'Tìm và dẫn đi xem nhà khắp thung lũng.', 'Chiến lược đặt giá dựa trên các căn bán gần đây.', 'Thương lượng sau kiểm tra nhà và thẩm định giá.', 'Theo dõi escrow đến ngày đóng.'] },
            { kind: 'section', h2: 'Thỏa thuận với người mua', p: ['Từ tháng 8 năm 2024, người mua ký thỏa thuận bằng văn bản với môi giới trước khi đi xem nhà. Văn bản này ghi rõ môi giới làm gì và được trả phí thế nào. Bao giải thích từng điều bằng tiếng Việt trước khi bắt đầu.'] },
            { kind: 'cta', text: 'Muốn biết mình mua được giá bao nhiêu? Gọi Bao.' },
            { kind: 'section', h2: 'Hỗ trợ người mua nhà lần đầu', p: [`Nếu mua nhà lần đầu, bạn có thể đủ điều kiện nhận hỗ trợ tiền trả trước. Chương trình Sở hữu Nhà của Quận Los Angeles hỗ trợ tới ${hop80} ở các thành phố tham gia như ${hopCities}, và chương trình CalHFA MyHome hỗ trợ tới ${calhfa.myHomeMaxPct}% trên toàn tiểu bang.`] },
            { kind: 'section', h2: 'Quy trình mua nhà', steps: ['Nói về mục tiêu và ngân sách', 'Được duyệt trước', 'Đi xem nhà', 'Đặt giá mua', 'Escrow và hoàn tất giao dịch'] },
          ],
          faqH2: 'Câu hỏi thường gặp',
          faq: [
            ['Ai trả phí cho môi giới mua nhà?', 'Điều này được ghi trong thỏa thuận với người mua. Có khi người bán trả một phần hoặc toàn bộ, có khi người mua trả. Hoa hồng có thể thương lượng.'],
            ['Tôi có thể đi xem nhà trước khi được duyệt trước không?', 'Được, nhưng duyệt trước giúp người bán thấy bạn nghiêm túc và cho bạn biết ngân sách thật. Bao thường chuẩn bị được nhanh.'],
            ['Bạn giúp người mua ở mọi thành phố trong San Gabriel Valley chứ?', 'Có, toàn bộ thung lũng và các nơi khác trong Quận Los Angeles.'],
          ],
          relatedH2: 'Dịch vụ liên quan',
          related: [
            { href: p.sell, label: 'Môi giới bán nhà' },
            { href: p.loan, label: 'Chuyên viên cho vay' },
            { href: p.realtor, label: 'Realtor người Việt' },
          ],
        }
      : {
          path: p.buy,
          crumb: 'Buyer’s agent',
          parent: { name: 'Vietnamese realtor', path: p.realtor },
          title: 'San Gabriel Valley Buyer’s Agent | Buy a Home',
          description: 'San Gabriel Valley buyer’s agent Bao Nguyen helps you get pre-approved, find a home and win the offer, with financing in-house. In Vietnamese or English.',
          h1: 'San Gabriel Valley Buyer’s Agent',
          lead: 'San Gabriel Valley buyer’s agent Bao Nguyen helps you get pre-approved, find the right home and negotiate the offer, and because he is also a licensed loan officer, your financing is handled by the same person.',
          serviceType: "Buyer's agent",
          blocks: [
            { kind: 'cta', text: 'Start with a free consultation.' },
            { kind: 'section', h2: 'What’s included', list: ['Pre-approval and a clear monthly budget before you tour.', 'Home search and tours across the valley.', 'Offer strategy based on recent sales.', 'Inspection, appraisal and repair negotiation.', 'Coordinating escrow through closing.'] },
            { kind: 'section', h2: 'Your buyer agreement', p: ['Since August 2024, buyers sign a written agreement with their agent before touring homes. It spells out what the agent does and how they are paid. Bao walks you through it in plain Vietnamese or English before you start.'] },
            { kind: 'cta', text: 'Want to know what you can afford? Call Bao.' },
            { kind: 'section', h2: 'First-time buyer help', p: [`If you are buying your first home, you may qualify for down payment help. Los Angeles County’s Home Ownership Program offers up to ${hop80} in participating cities such as ${hopCities}, and CalHFA’s MyHome program offers up to ${calhfa.myHomeMaxPct}% statewide.`] },
            { kind: 'section', h2: 'How buying works', steps: ['Talk through goals and budget', 'Get pre-approved', 'Tour homes', 'Make an offer', 'Escrow and closing'] },
          ],
          faqH2: 'Frequently asked questions',
          faq: [
            ['Who pays the buyer’s agent?', 'It is set in your written buyer agreement. Sometimes the seller pays part or all of it, sometimes the buyer does. Commissions are negotiable.'],
            ['Can I tour homes before I am pre-approved?', 'You can, but getting pre-approved first shows sellers you are serious and tells you your real budget. Bao can usually prepare it quickly.'],
            ['Do you help buyers in every San Gabriel Valley city?', 'Yes, across the whole valley and the rest of Los Angeles County.'],
          ],
          relatedH2: 'Related services',
          related: [
            { href: p.sell, label: 'Seller’s agent' },
            { href: p.loan, label: 'Loan officer' },
            { href: p.realtor, label: 'Vietnamese realtor' },
          ],
        };
  }

  // Loan officer
  return vi
    ? {
        path: p.loan,
        crumb: 'Chuyên viên cho vay',
        title: 'Chuyên viên cho vay ở San Gabriel Valley | Bao Nguyen',
        description: 'Chuyên viên cho vay ở San Gabriel Valley, Bao Nguyen so sánh khoản vay từ nhiều nhà cho vay cho mua nhà, tái tài trợ và rút tiền mặt. Nói tiếng Việt.',
        h1: 'Chuyên viên cho vay ở San Gabriel Valley',
        lead: 'Chuyên viên cho vay ở San Gabriel Valley, Bao Nguyen (NMLS #1317747) giúp bạn mua nhà, tái tài trợ hoặc rút tiền mặt từ nhà, so sánh chương trình vay từ nhiều nhà cho vay bán sỉ qua O.A.B.M. Inc., dba Virchu Capital.',
        serviceType: 'Mortgage loan officer',
        blocks: [
          { kind: 'cta', text: 'Hỏi về khoản vay của bạn, miễn phí.' },
          { kind: 'section', h2: 'Các loại vay tôi hỗ trợ', list: ['Vay mua nhà: conventional, FHA, VA và jumbo.', 'Tái tài trợ đổi lãi suất hoặc thời hạn.', 'Tái tài trợ rút tiền mặt và HELOC.', 'Vay bằng sao kê ngân hàng cho người tự kinh doanh.', 'Hỗ trợ tiền trả trước (CalHFA, chương trình HOP của Quận Los Angeles).'] },
          { kind: 'section', h2: `Hạn mức vay ${loanLimits.year} ở Quận Los Angeles`, p: [`Hạn mức conforming và FHA cho nhà một căn là ${lim} ở mọi thành phố trong San Gabriel Valley.`], link: { href: loanLimits.sources.conforming.url, label: 'Nguồn: FHFA' } },
          { kind: 'cta', text: 'Sẵn sàng được duyệt trước? Gọi hoặc nhắn tin cho Bao.' },
          { kind: 'section', h2: 'Giấy tờ cần chuẩn bị', list: ['W-2 hoặc tờ khai thuế 2 năm gần nhất.', 'Phiếu lương 30 ngày gần nhất.', 'Sao kê ngân hàng 2 tháng gần nhất.', 'Giấy tờ tùy thân có ảnh.', 'Nếu tái tài trợ: bản sao kê khoản vay hiện tại và bảo hiểm nhà.'] },
          { kind: 'section', h2: 'Môi giới vay khác ngân hàng thế nào', p: ['Ngân hàng chỉ có sản phẩm của chính họ. Là môi giới vay, Bao so sánh nhiều nhà cho vay, có lợi khi bạn tự kinh doanh, có căn nhà đặc biệt, hoặc muốn nhiều lựa chọn hơn. Dù chọn cách nào, bạn đều nhận Bản Ước tính Khoản vay để so sánh chi phí.'] },
        ],
        faqH2: 'Câu hỏi thường gặp',
        faq: [
          ['Hỏi thông tin có ảnh hưởng điểm tín dụng không?', 'Nói chuyện và hỏi câu hỏi thì không. Duyệt trước cần kiểm tra tín dụng, và Bao sẽ cho bạn biết trước khi thực hiện.'],
          ['Một khoản vay mất bao lâu?', 'Nhiều hồ sơ mua nhà và tái tài trợ hoàn tất trong khoảng 30 đến 45 ngày, tùy thẩm định giá, title và giấy tờ.'],
          ['Bạn có giải thích mọi thứ bằng tiếng Việt không?', 'Có. Từ lựa chọn vay đến giấy tờ đóng giao dịch, Bao giải thích bằng tiếng Việt hoặc tiếng Anh.'],
        ],
        relatedH2: 'Dịch vụ liên quan',
        related: [
          { href: p.realtor, label: 'Realtor người Việt' },
          { href: p.buy, label: 'Môi giới mua nhà' },
          { href: p.areas, label: 'Khu vực phục vụ' },
        ],
      }
    : {
        path: p.loan,
        crumb: 'Loan officer',
        title: 'San Gabriel Valley Loan Officer | Bao Nguyen',
        description: 'San Gabriel Valley loan officer Bao Nguyen compares loans from multiple lenders for purchases, refinances and cash-out. Licensed. Vietnamese and English.',
        h1: 'San Gabriel Valley Loan Officer',
        lead: 'San Gabriel Valley loan officer Bao Nguyen (NMLS #1317747) helps you buy, refinance or take cash out, comparing loan programs from multiple wholesale lenders through O.A.B.M. Inc., dba Virchu Capital.',
        serviceType: 'Mortgage loan officer',
        blocks: [
          { kind: 'cta', text: 'Ask about your loan, free.' },
          { kind: 'section', h2: 'Loans I help with', list: ['Purchase loans: conventional, FHA, VA and jumbo.', 'Rate-and-term refinance.', 'Cash-out refinance and HELOCs.', 'Bank-statement loans for self-employed borrowers.', 'Down payment assistance (CalHFA, Los Angeles County HOP).'] },
          { kind: 'section', h2: `${loanLimits.year} loan limits in Los Angeles County`, p: [`The conforming and FHA limit for a one-unit home is ${lim} in every San Gabriel Valley city.`], link: { href: loanLimits.sources.conforming.url, label: 'Source: FHFA' } },
          { kind: 'cta', text: 'Ready to get pre-approved? Call or text Bao.' },
          { kind: 'section', h2: 'What to have ready', list: ['Last 2 years of W-2s or tax returns.', 'Last 30 days of pay stubs.', 'Last 2 months of bank statements.', 'Photo ID.', 'For a refinance: your current mortgage statement and homeowners insurance.'] },
          { kind: 'section', h2: 'Broker vs. bank', p: ['A bank offers only its own loans. As a mortgage broker, Bao compares several lenders, which helps if you are self-employed, have an unusual property, or want more options. Either way, you get a Loan Estimate to compare costs.'] },
        ],
        faqH2: 'Frequently asked questions',
        faq: [
          ['Will asking questions affect my credit?', 'No. A conversation does not touch your credit. A pre-approval needs a credit check, and Bao tells you before he runs it.'],
          ['How long does a loan take?', 'Many purchases and refinances close in about 30 to 45 days, depending on the appraisal, title work and paperwork.'],
          ['Can you explain everything in Vietnamese?', 'Yes. From loan options to closing documents, Bao explains everything in Vietnamese or English.'],
        ],
        relatedH2: 'Related services',
        related: [
          { href: p.realtor, label: 'Vietnamese realtor' },
          { href: p.buy, label: 'Buyer’s agent' },
          { href: p.areas, label: 'Areas served' },
        ],
      };
}
