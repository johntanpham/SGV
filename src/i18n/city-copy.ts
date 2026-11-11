import type { City } from '../data/cities';
import { loanLimits, hop, calhfa } from '../data/loan-limits';
import type { Lang } from './strings';

export const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
export const num = (n: number) => n.toLocaleString('en-US');

export function cityFacts(c: City) {
  const aboveLimit = c.medianValue > loanLimits.conforming.oneUnit;
  const cashOutCap = Math.round((c.medianValue * 0.8) / 1000) * 1000;
  const inHop = (hop.participatingCities as readonly string[]).includes(c.name);
  return { aboveLimit, cashOutCap, inHop };
}

/** All visible copy for a city page, in one language. Keeps each page well under 800 words. */
export function cityCopy(c: City, lang: Lang) {
  const { aboveLimit, cashOutCap, inHop } = cityFacts(c);
  const L = loanLimits;
  const n = c.name;
  const zipList = c.zips.join(', ');
  if (lang === 'vi') {
    return {
      title: `${n}: Môi giới vay mua nhà nói tiếng Việt`,
      description: `Môi giới vay ${n} nói tiếng Việt: Bao Nguyen giúp tái tài trợ, rút tiền mặt từ nhà, mua nhà. Giá nhà, hạn mức vay ${L.year}, hỗ trợ trả trước.`,
      crumbAreas: 'Khu vực phục vụ',
      h1: `Môi giới vay mua nhà tại ${n}, CA`,
      lead: `Bạn đang tìm người môi giới vay mua nhà ở ${n}? Bao Nguyen là chuyên viên cho vay có giấy phép (NMLS #1317747) kiêm môi giới địa ốc, giúp cư dân ${n} tái tài trợ, rút tiền mặt từ nhà (cash-out hoặc HELOC), và mua hoặc bán nhà, bằng tiếng Việt hoặc tiếng Anh.`,
      intro: c.intro.vi,
      factsH2: `Nhà ở tại ${n}: số liệu chính`,
      facts: [
        ['Dân số (ước tính 2025)', num(c.population)],
        ['Tỷ lệ nhà do chủ sở hữu ở', `${c.ownerRate}%`],
        ['Giá trị nhà trung vị', usd(c.medianValue)],
        ['Tiền thuê nhà trung vị (tháng)', usd(c.medianRent)],
        ['Nói ngôn ngữ khác tiếng Anh tại nhà', `${c.otherLanguage}%`],
        ...(c.vietnamese ? [['Cư dân gốc Việt', `${num(c.vietnamese.people)} (${c.vietnamese.pct}%)`]] : []),
        ['Mã ZIP', zipList],
      ] as [string, string][],
      source: 'Nguồn',
      limitsH2: `Hạn mức vay năm ${L.year} tại ${n}`,
      limitsP: `${n} thuộc Quận Los Angeles, nơi hạn mức vay conforming năm ${L.year} cho nhà một căn là ${usd(L.conforming.oneUnit)}, và hạn mức FHA cũng là ${usd(L.fha.oneUnit)}.`,
      limitsImplication: aboveLimit
        ? `Giá trị nhà trung vị ở ${n} là ${usd(c.medianValue)}, cao hơn hạn mức của quận, nên nhiều người mua ở ${n} cần khoản vay jumbo hoặc trả trước nhiều hơn để nằm trong hạn mức conforming.`
        : `Với giá trị nhà trung vị khoảng ${usd(c.medianValue)}, phần lớn nhà ở ${n} có thể vay bằng khoản vay thông thường (conventional) hoặc FHA, không cần khoản vay jumbo.`,
      refiH2: `Tái tài trợ và rút tiền mặt từ nhà ở ${n}`,
      refiP1: `Khoảng ${c.ownerRate}% số nhà ở ${n} do chính chủ sở hữu ở. Nếu lãi suất đã giảm kể từ khi bạn mua nhà, tái tài trợ (rate-and-term) có thể giảm tiền trả hàng tháng hoặc rút ngắn thời hạn vay.`,
      refiP2: `Nếu bạn cần tiền để sửa nhà, xây ADU, đóng học phí hay trả các khoản nợ lãi cao, tái tài trợ rút tiền mặt hoặc HELOC cho phép bạn vay dựa trên phần giá trị đã tích lũy. Nhiều khoản vay rút tiền mặt thông thường cho tổng số nợ tối đa 80% giá trị nhà; với giá trị trung vị ${usd(c.medianValue)} ở ${n}, con số đó khoảng ${usd(cashOutCap)} tổng khoản vay, trừ đi số còn nợ. Hạn mức thực tế của bạn tùy vào tín dụng, thu nhập, căn nhà và chương trình vay.`,
      buyH2: `Mua nhà ở ${n}: hỗ trợ tiền trả trước`,
      buyP1: inHop
        ? `${n} nằm trong danh sách các thành phố tham gia Chương trình Sở hữu Nhà (HOP) của Quận Los Angeles, hỗ trợ người mua nhà lần đầu tới ${usd(hop.hop80Max)} (HOP80) hoặc ${usd(hop.hop120Max)} (HOP120) cho tiền trả trước, tùy theo thu nhập. Chương trình toàn tiểu bang CalHFA MyHome (tới ${calhfa.myHomeMaxPct}% giá nhà) cũng có thể áp dụng.`
        : `${n} không có trong danh sách thành phố tham gia Chương trình Sở hữu Nhà (HOP) của Quận Los Angeles, nên khoản vay HOP của quận không dùng được cho nhà trong phạm vi thành phố. Các chương trình toàn tiểu bang như CalHFA MyHome (tới ${calhfa.myHomeMaxPct}% giá nhà) vẫn áp dụng, và tôi có thể kiểm tra xem ${n} có chương trình riêng phù hợp với bạn hay không.`,
      buyP2: 'Vì tôi vừa là chuyên viên cho vay vừa là môi giới địa ốc, việc duyệt trước, tìm nhà và đặt giá mua đều do cùng một người lo.',
      langH2: 'Phục vụ bằng tiếng Việt và tiếng Anh',
      langP: `${c.otherLanguage}% cư dân ${n} nói một ngôn ngữ khác tiếng Anh tại nhà.${c.vietnamese ? ` Khoảng ${num(c.vietnamese.people)} cư dân (${c.vietnamese.pct}%) là người Mỹ gốc Việt.` : ''} Là chuyên viên cho vay và môi giới địa ốc người Việt, tôi giải thích mọi lựa chọn vay, giấy tờ công bố và hồ sơ đóng giao dịch bằng tiếng Việt hoặc tiếng Anh.`,
      nearH2: 'Các thành phố khác tôi phục vụ ở San Gabriel Valley',
      allAreas: 'Tất cả khu vực phục vụ',
      faqH2: `Câu hỏi thường gặp về vay mua nhà ở ${n}`,
      faq: [
        [`Tôi nên dùng môi giới vay ở ${n} hay đến thẳng ngân hàng?`, 'Ngân hàng chỉ cho vay sản phẩm của chính họ. Môi giới vay so sánh chương trình từ nhiều nhà cho vay bán sỉ, có lợi nếu bạn tự kinh doanh, có căn nhà đặc biệt, hoặc muốn có thêm lựa chọn. Dù chọn cách nào, bạn đều nhận Bản Ước tính Khoản vay (Loan Estimate) để so sánh chi phí.'],
        [`Tái tài trợ ở ${n} mất bao lâu?`, 'Nhiều hồ sơ tái tài trợ hoàn tất trong khoảng 30 đến 45 ngày, tùy vào thẩm định giá, thủ tục chủ quyền (title) và tốc độ nộp giấy tờ.'],
        [`Bạn phục vụ những mã ZIP nào ở ${n}?`, `Tất cả, bao gồm ${zipList}.`],
      ] as [string, string][],
      ctaH2: `Nói chuyện với Bao về khoản vay ở ${n}`,
      ctaP: 'Gọi hoặc nhắn tin để được tư vấn miễn phí. Không cần chuẩn bị gì trước.',
    };
  }
  return {
    title: `${n} Mortgage Broker: Refinance & Home Loans`,
    description: `${n} mortgage broker Bao Nguyen helps you refinance, take cash out or buy a home. Local home values, ${L.year} loan limits and down payment help.`,
    crumbAreas: 'Areas',
    h1: `Mortgage Broker in ${n}, CA`,
    lead: `Looking for a mortgage broker in ${n}? Bao Nguyen is a licensed mortgage loan originator (NMLS #1317747) and real estate broker associate who helps ${n} homeowners refinance, take cash out with a cash-out refinance or HELOC, and buy or sell homes, in English or Vietnamese.`,
    intro: c.intro.en,
    factsH2: `${n} housing at a glance`,
    facts: [
      ['Population (2025 estimate)', num(c.population)],
      ['Homes lived in by their owners', `${c.ownerRate}%`],
      ['Median home value', usd(c.medianValue)],
      ['Median rent (monthly)', usd(c.medianRent)],
      ['Speak a language other than English at home', `${c.otherLanguage}%`],
      ...(c.vietnamese ? [['Vietnamese-American residents', `${num(c.vietnamese.people)} (${c.vietnamese.pct}%)`]] : []),
      ['ZIP codes', zipList],
    ] as [string, string][],
    source: 'Source',
    limitsH2: `${L.year} loan limits in ${n}`,
    limitsP: `${n} is in Los Angeles County, where the ${L.year} conforming loan limit for a one-unit home is ${usd(L.conforming.oneUnit)}, and the FHA limit is also ${usd(L.fha.oneUnit)}.`,
    limitsImplication: aboveLimit
      ? `The median home value in ${n} is ${usd(c.medianValue)}, above the county limit, so many ${n} buyers need a jumbo loan or a larger down payment to stay within conforming limits.`
      : `With a median home value of ${usd(c.medianValue)}, a typical ${n} home can be financed with a conventional or FHA loan rather than a jumbo loan.`,
    refiH2: `Refinance and cash-out refinance in ${n}`,
    refiP1: `About ${c.ownerRate}% of homes in ${n} are lived in by their owners. If rates have dropped since you bought, a rate-and-term refinance can lower your monthly payment or shorten your loan.`,
    refiP2: `If you need cash for renovations, an ADU, tuition or paying off high-interest debt, a cash-out refinance or a HELOC lets you borrow against your equity. Many conventional cash-out loans allow total borrowing up to 80% of the home's value; at ${n}'s median value of ${usd(c.medianValue)}, that is about ${usd(cashOutCap)} in total loan, minus what you still owe. Your own limit depends on your credit, income, property and program.`,
    buyH2: `Buying a home in ${n}: down payment help`,
    buyP1: inHop
      ? `${n} is one of the participating cities in Los Angeles County's Home Ownership Program (HOP), which offers first-time buyers up to ${usd(hop.hop80Max)} (HOP80) or ${usd(hop.hop120Max)} (HOP120) toward the down payment, based on income. The statewide CalHFA MyHome program (up to ${calhfa.myHomeMaxPct}% of the price) may also apply.`
      : `${n} is not on Los Angeles County's list of Home Ownership Program (HOP) participating cities, so the county's HOP loans can't be used for a home inside city limits. Statewide programs such as CalHFA MyHome (up to ${calhfa.myHomeMaxPct}% of the price) still apply, and I can check whether ${n} runs its own program for your situation.`,
    buyP2: "Because I'm both your loan officer and a realtor, the pre-approval, the home search and the offer are handled by the same person.",
    langH2: 'Service in English and Vietnamese',
    langP: `${c.otherLanguage}% of ${n} residents speak a language other than English at home.${c.vietnamese ? ` About ${num(c.vietnamese.people)} residents (${c.vietnamese.pct}%) are Vietnamese American.` : ''} As a Vietnamese loan officer and realtor, I explain every loan option, disclosure and closing document in English or Tiếng Việt.`,
    nearH2: 'Other San Gabriel Valley cities I serve',
    allAreas: 'All areas I serve',
    faqH2: `${n} mortgage FAQ`,
    faq: [
      [`Should I use a mortgage broker in ${n} or go to a bank?`, "A bank offers its own loans. A mortgage broker compares programs from several wholesale lenders, which can help if you're self-employed, have an unusual property, or simply want more options. Either way, you get a Loan Estimate to compare costs."],
      [`How long does a refinance take in ${n}?`, 'Many refinances close in about 30 to 45 days, depending on the appraisal, title work and how quickly documents come in.'],
      [`Which ${n} ZIP codes do you serve?`, `All of them, including ${zipList}.`],
    ] as [string, string][],
    ctaH2: `Talk to Bao about your ${n} loan`,
    ctaP: 'Call or text for a free consultation. No paperwork needed to start.',
  };
}
