// Tshushko Moto — adventure data.
//
// One entry per YouTube video. To publish a new ride:
//   1. Drop your GPX file into data/gpx/ (any name, e.g. my-new-trip.gpx)
//   2. Add an entry below. `youtubeId` is the 11-char id from
//      https://www.youtube.com/watch?v=THIS_PART
//   3. Copy the `marker` line printed by
//      python3 tools/gpx_stats.py data/gpx/my-new-trip.gpx
//      into the entry (`marker` = average position of the track points,
//      used for the pin on the home page map)
//   4. Add an `i18n` block with the French and Bulgarian translations
//      (title, location, description — keep the same HTML structure).
//      Missing translations fall back to the English values.
//   5. Commit — the site picks it up automatically (newest first).
//
// NOTE: entries below marked (real) use actual GPS data from data/gpx/.
// The others are still SAMPLE placeholders — drop your real GPX file in
// data/gpx/, then update distance / gain / duration / description.
// Tip: distance + gain can be computed from the GPX with:
//   python3 tools/gpx_stats.py data/gpx/my-file.gpx

window.VIDEOS = [
  {
    slug: 'autumn-ruy-peak',
    title: 'Autumn Trails Towards Ruy Peak - Himalayan 450 Solo Off-Road Ride',
    youtubeId: 'BcbVcU-EwnY',
    date: '2026-10-18',
    location: 'Ruy Peak area, Bulgaria',
    distance: 21.7,
    gain: 1534,
    duration: '2h 00min',
    gpx: 'data/gpx/autumn-ruy-peak.gpx',
    isTet: false,
    marker: [42.84907, 22.59727],
    center: [42.84907, 22.59727],
    zoom: 11,
    description:
      '<p>An autumn off-road ride through the beautiful forests and mountains of Bulgaria, on my Royal Enfield Himalayan 450.</p>' +
      '<p>Today\'s goal is to reach Ruy Peak, on the border between Bulgaria and Serbia. Recent rainfall has left the trails muddy and unpredictable, but the vibrant autumn colors make every kilometer worth the ride.</p>' +
      '<p>As the final climb gets steeper and the terrain turns into wet, deep ruts, reaching the summit proves harder than expected.</p>' +
      '<p>Not every ride ends at the destination. Sometimes, the journey itself is the reward.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring beautiful off-road routes, consider subscribing!</p>',
    i18n: {
      fr: {
        title: 'Sentiers d’automne vers le pic de Ruy – Balade solo tout-terrain en Himalayan 450',
        location: 'Secteur du pic de Ruy, Bulgarie',
        description:
          '<p>Une balade tout-terrain automnale à travers les magnifiques forêts et montagnes de Bulgarie, sur ma Royal Enfield Himalayan 450.</p>' +
          '<p>L’objectif du jour est d’atteindre le pic de Ruy, sur la frontière entre la Bulgarie et la Serbie. Les pluies récentes ont laissé les sentiers boueux et imprévisibles, mais les couleurs vives de l’automne font que chaque kilomètre en vaut la peine.</p>' +
          '<p>À mesure que la montée finale s’accentue et que le terrain se transforme en ornières profondes et boueuses, l’ascension du sommet s’avère plus difficile que prévu.</p>' +
          '<p>Toutes les balades ne se terminent pas à destination. Parfois, le voyage est en lui-même la récompense.</p>' +
          '<p>Si les motos d’aventure, les trails et l’exploration de belles routes tout-terrain vous plaisent, pensez à vous abonner !</p>'
      },
      bg: {
        title: 'Есенни пътеки към връх Руй – Solo офроуд с Himalayan 450',
        location: 'Връх Руй, България',
        description:
          '<p>Есенно офроуд пътуване през красивите гори и планини на България, на моя Royal Enfield Himalayan 450.</p>' +
          '<p>Днешната цел е да стигна до връх Руй, на границата между България и Сърбия. Дъждовете напоследък са оставили пътеките кални и непредвидими, но ярките есенни цветове правят всеки километър да си струва.</p>' +
          '<p>Колкото по-стръмна става последната част от изкачването и теренът се превръща в мокри, дълбоки колеи, толкова по-трудно се оказва достигането до върха.</p>' +
          '<p>Не всяко пътуване завършва в дестинацията. Понякога самото пътуване е наградата.</p>' +
          '<p>Ако обичате авентюр мотоциклети, офроуд пътеки и проучването на красиви маршрути, абонирайте се!</p>'
      }
    }
  },
  {
    slug: 'hills-of-murgash',
    title: 'Steep Hills of Murgash Peak – Himalayan 450 Solo Off-Road Ride',
    youtubeId: 'A0umvJA2544',
    date: '2026-10-03',
    location: 'Buhovo → Murgash Peak, Bulgaria',
    distance: 23.7,
    gain: 1728,
    duration: '2h 00min',
    gpx: 'data/gpx/hills-of-murgash.gpx',
    isTet: false,
    marker: [42.81169, 23.63857],
    center: [42.81169, 23.63857],
    zoom: 11,
    description:
      '<p>Riding off-road on my <strong>Royal Enfield Himalayan 450</strong> from <strong>Buhovo to Murgash Peak (1687m)</strong> in Bulgaria.</p>' +
      '<p>The route starts with open dirt tracks before diving into forest trails and rolling mountain terrain. But the real highlights are the <strong>steep climbs and descents</strong> along the way, some of them seriously demanding, with incredible views opening up across the Bulgarian mountains, that took me all the way to the peak at almost 1700m.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring beautiful off-road routes, consider subscribing!</p>',
    i18n: {
      fr: {
        title: 'Les pentes raides du pic de Murgash – Balade solo tout-terrain en Himalayan 450',
        location: 'Buhovo → pic de Murgash, Bulgarie',
        description:
          '<p>En balade tout-terrain sur ma <strong>Royal Enfield Himalayan 450</strong>, de <strong>Buhovo au pic de Murgash (1687 m)</strong>, en Bulgarie.</p>' +
          '<p>L’itinéraire commence par des pistes terreuses dégagées avant de plonger dans les sentiers forestiers et un terrain montagneux vallonné. Mais les vrais temps forts sont les <strong>montées et descentes raides</strong> sur le chemin, certaines sérieusement exigeantes, avec des vues à couper le souffle sur les montagnes bulgares, jusqu’au sommet à près de 1700 m.</p>' +
          '<p>Si les motos d’aventure, les trails et l’exploration de belles routes tout-terrain vous plaisent, pensez à vous abonner !</p>'
      },
      bg: {
        title: 'Стръмните склонове на връх Мургаш – Solo офроуд с Himalayan 450',
        location: 'Бухово → връх Мургаш, България',
        description:
          '<p>Офроуд на моя <strong>Royal Enfield Himalayan 450</strong> от <strong>Бухово до връх Мургаш (1687 м)</strong> в България.</p>' +
          '<p>Маршрутът започва с открити земени пътеки, преди да потоне в горски пътеки и вълнообразен планински терен. Но истинските хайлайти са <strong>стръмните изкачвания и спускания</strong> по пътя, някои от които сериозно изискващи, с невероятни гледки към българските планини, водещи чак до върха на почти 1700 м.</p>' +
          '<p>Ако обичате авентюр мотоциклети, офроуд пътеки и проучването на красиви маршрути, абонирайте се!</p>'
      }
    }
  },
  {
    slug: 'trails-of-thassos',
    title: 'Trails of Thassos 🇬🇷 - Himalayan 450 Solo Adventure',
    youtubeId: 'iVzGTs1kOsw',
    date: '2026-09-19',
    location: 'Thassos, Greece',
    distance: 70.5,
    gain: 4397,
    duration: '4h 30min',
    gpx: 'data/gpx/trails-of-thassos.gpx',
    isTet: false,
    marker: [40.68124, 24.65783],
    center: [40.68124, 24.65783],
    zoom: 11,
    description:
      '<p>A solo off-road adventure on the beautiful Greek island of <strong>Thassos</strong>, riding my <strong>Royal Enfield Himalayan 450</strong> through remote forest trails, rugged mountain roads, and breathtaking landscapes.</p>' +
      '<p>Starting from the south of the island, the ride took me through the forests around Theologos, all the way to <strong>Ypsario Peak</strong>, the highest point on Thassos, with stunning 360° views over the Aegean Sea.</p>' +
      '<p>From there, I continued through the mountains toward the scenic plateau on the way to Kastro, and back towards the coast using a breathtaking trail : one of the most memorable sections of the ride.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring beautiful off-road routes, consider subscribing!</p>',
    i18n: {
      fr: {
        title: 'Les trails de Thasos 🇬🇷 – Aventure solo en Himalayan 450',
        location: 'Thasos, Grèce',
        description:
          '<p>Une aventure tout-terrain en solo sur la belle île grecque de <strong>Thasos</strong>, à dos de ma <strong>Royal Enfield Himalayan 450</strong>, à travers des sentiers forestiers reculés, des routes de montagne escarpées et des paysages à couper le souffle.</p>' +
          '<p>En partant du sud de l’île, la balade m’a menée à travers les forêts autour de Theologos, jusqu’au <strong>pic de Ypsario</strong>, le point le plus élevé de Thasos, avec des vues panoramiques à 360° sur la mer Égée.</p>' +
          '<p>De là, j’ai continué à travers les montagnes vers le plateau pittoresque sur la route de Kastro, puis suis redescendue vers la côte par un sentier superbe : l’un des passages les plus mémorables de la balade.</p>' +
          '<p>Si les motos d’aventure, les trails et l’exploration de belles routes tout-terrain vous plaisent, pensez à vous abonner !</p>'
      },
      bg: {
        title: 'Пътеки на Тасос 🇬🇷 – Solo адуентюр с Himalayan 450',
        location: 'Тасос, Гърция',
        description:
          '<p>Solo офроуд приключение на красивия гръцки остров <strong>Тасос</strong>, на моя <strong>Royal Enfield Himalayan 450</strong>, през отдалечени горски пътеки, стръмни планински пътища и зашеметяващи пейзажи.</p>' +
          '<p>Започвайки от южната част на острова, пътуването ме заведе през горите около Теологос, чак до <strong>връх Ипсарий</strong> – най-високата точка на Тасос, с прекрасни 360° гледки към Егейско море.</p>' +
          '<p>Оттам продължих през планините към живописното плато по пътя за Кастро и се върнах към брега по зашеметяваща пътека – един от най-незабравимите отрезци на пътуването.</p>' +
          '<p>Ако обичате авентюр мотоциклети, офроуд пътеки и проучването на красиви маршрути, абонирайте се!</p>'
      }
    }
  },
  {
    slug: 'tet-bulgaria-section-02-03',
    title: 'TET Bulgaria Section 02 & 03 - From Belmeken to Devin - Himalayan 450 solo off-road ride',
    youtubeId: '7i7AQem0vYg',
    date: '2026-07-12',
    location: 'Belmeken → Devin, Bulgaria',
    distance: 185.8,
    gain: 4899,
    duration: '16h 00min',
    gpx: 'data/gpx/tet-bulgaria-section-02-03.gpx',
    isTet: true,
    marker: [41.88729, 23.95184],
    center: [41.88729, 23.95184],
    zoom: 9,
    description:
      '<p>Riding my Royal Enfield Himalayan 450 off-road on Section 02 and 03 of the Trans Euro Trail in Bulgaria. This ride features sandy tracks, rocks, dirt roads, gravel roads, and forest trails, with some beautiful scenic views along the way.</p>' +
      '<p>As I am improving my off-road riding skills, I really enjoyed this 2 days journey. The difficulty was perfectly balanced for me, the very easy sections were not too long, and the challenging ones were adapted to my level, so it was never boring nor scary. This ride was done on the 11th and 12th of July 2026.</p>' +
      '<p>The Trans Euro Trail (TET) is a network of off-road routes crossing Europe, designed for adventure and dual-sport motorcycles. The Bulgarian sections offer a mix of forest roads, mountain trails, and incredible landscapes.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring off-road routes, consider subscribing!</p>',
    i18n: {
      fr: {
        title: 'TET Bulgarie, sections 02 & 03 – De Belmeken à Devin – Balade solo tout-terrain en Himalayan 450',
        location: 'Belmeken → Devin, Bulgarie',
        description:
          '<p>En balade tout-terrain sur ma Royal Enfield Himalayan 450, sur les sections 02 et 03 du Trans Euro Trail en Bulgarie. Cette balade comporte des pistes sablonneuses, des rochers, des routes de terre, des pistes gravillonnées et des sentiers forestiers, avec quelques magnifiques points de vue sur le chemin.</p>' +
          '<p>Puisque j’améliore mes compétences en tout-terrain, j’ai vraiment apprécié ce voyage de deux jours. La difficulté était parfaitement équilibrée pour moi : les sections très faciles n’étaient pas trop longues et les plus ardues étaient adaptées à mon niveau, donc jamais ennuyeux ni effrayant. Cette balade a été réalisée les 11 et 12 juillet 2026.</p>' +
          '<p>Le Trans Euro Trail (TET) est un réseau de routes tout-terrain traversant l’Europe, conçu pour les motos d’aventure et dual-sport. Les sections bulgares offrent un mélange de routes forestières, de sentiers de montagne et de paysages incroyables.</p>' +
          '<p>Si les motos d’aventure, les trails et l’exploration de routes tout-terrain vous plaisent, pensez à vous abonner !</p>'
      },
      bg: {
        title: 'TET България, секции 02 и 03 – От Белмекен до Девин – Solo офроуд с Himalayan 450',
        location: 'Белмекен → Девин, България',
        description:
          '<p>Офроуд с моя Royal Enfield Himalayan 450 по секции 02 и 03 на Trans Euro Trail в България. Пътуването включва пясъчни пътеки, камъни, земени пътища, чакълени пътеки и горски пътеки, с някои красиви гледки по пътя.</p>' +
          '<p>Тъй като подобрявам офроуд уменията си, много се насладих на това двудневно пътуване. Трудността беше перфектно балансирана за мен – много лесните секции не бяха твърде дълги, а предизвикателните бяха съобразени с нивото ми, така че никога не беше нито скучно, нито страшно. Пътуването е от 11 и 12 юли 2026 г.</p>' +
          '<p>Trans Euro Trail (TET) е мрежа от офроуд маршрути, минаваща през Европа, предназначена за авентюр и дуал спорт мотоциклети. Българските секции предлагат смесица от горски пътища, планински пътеки и невероятни пейзажи.</p>' +
          '<p>Ако обичате авентюр мотоциклети, офроуд пътеки и проучването на маршрути, абонирайте се!</p>'
      }
    }
  },
  {
    slug: 'from-forest-to-mountain-ridge',
    title: 'From Forest to Mountain Ridge - A Day of Exploration',
    youtubeId: 'KIx1mNNerbQ',
    date: '2026-08-16',
    location: 'Kyustendil → Ruen Peak, Bulgaria',
    distance: 22.9,
    gain: 1718,
    duration: '1h 30min',
    gpx: 'data/gpx/from-forest-to-mountain-ridge.gpx',
    isTet: false,
    marker: [42.20084, 22.60749],
    center: [42.20084, 22.60749],
    zoom: 11,
    description:
      '<p>Some days, you don\'t need a plan. You just need to get on the bike and go.</p>' +
      '<p>This ride started like any other random day : my motorcycle, some off-road trails, and no particular destination in mind. From the shade of the forest to a high mountain ridge, the higher I went, the better it felt.</p>' +
      '<p>When the heat gets too much, there is always a way: find some shade and head for higher ground.</p>' +
      '<p>Because adventure doesn\'t have to be far away, simply find somewhere new to explore. It doesn\'t need a special occasion, perfect conditions, or a carefully planned trip : sometimes, adventure is just waiting for you a few roads from home.</p>' +
      '<p>So whatever the day brings, there\'s no excuse to stop exploring and having some fun on the trails.</p>',
    i18n: {
      fr: {
        title: 'De la forêt à la crête montagneuse – Une journée d’exploration',
        location: 'Kyustendil → pic de Ruen, Bulgarie',
        description:
          '<p>Certains jours, on n’a pas besoin de plan. Il suffit de monter sur la moto et d’y aller.</p>' +
          '<p>Cette balade a commencé comme n’importe quel jour au hasard : ma moto, quelques pistes tout-terrain et aucune destination en tête. De l’ombre de la forêt à une haute crête montagneuse, plus je montais, mieux je me sentais.</p>' +
          '<p>Quand la chaleur devient trop forte, il y a toujours une solution : trouver de l’ombre et partir vers le haut.</p>' +
          '<p>Parce que l’aventure n’a pas besoin d’être loin, il suffit de trouver un nouvel endroit à explorer. Pas besoin d’occasion spéciale, de conditions parfaites ou d’un voyage minutieusement préparé : parfois, l’aventure n’attend qu’à quelques routes de la maison.</p>' +
          '<p>Alors, quoi que la journée réserve, aucune excuse pour arrêter d’explorer et de s’amuser sur les pistes.</p>'
      },
      bg: {
        title: 'От гората до планинската гребена – Ден на изследване',
        location: 'Кюстендил → връх Руен, България',
        description:
          '<p>Някои дни не ти трябва план. Трябва ти само да качиш мотоциклета и да тръгнеш.</p>' +
          '<p>Това пътуване започна като всеки случаен ден: мотоциклет, няколко офроуд пътеки и никаква конкретна дестинация. От сянката на гората до висока планинска гребена – колкото по-нагоре отидох, толкова по-добре се чувствах.</p>' +
          '<p>Когато жега стане твърде много, винаги има начин: намери сянка и тръгни нагоре.</p>' +
          '<p>Защото адуентюрът не трябва да е далече – просто намери ново място за изследване. Не е нужен специален повод, перфектни условия или внимателно планирано пътуване: понякога адуентюрът просто те чака на няколко пътища от вкъщи.</p>' +
          '<p>Така че, каквото и да донесе денят, няма извинение да спреш да изследваш и да се забавляваш по пътеките.</p>'
      }
    }
  },
  {
    slug: 'solo-off-road-incredible-views',
    title: 'Solo Off-Road Exploration Rewarded me with Incredible Views | Himalayan 450',
    youtubeId: '-QNzr0sQaIA',
    date: '2026-03-08',
    location: 'Between Svoge and Gintsi, Bulgaria',
    distance: 14.3,
    gain: 596,
    duration: '2h 00min',
    gpx: 'data/gpx/solo-off-road-incredible-views.gpx',
    isTet: false,
    marker: [43.01371, 23.17805],
    center: [43.01371, 23.17805],
    zoom: 11,
    description:
      '<p>Yesterday\'s ride turned into one of those unexpected adventures you remember for a long time.</p>' +
      '<p>I randomly picked a trail on the map that I had never explored before and decided to see where it would lead. What started as simple curiosity quickly turned into an amazing off-road ride.</p>' +
      '<p>The trail had everything: fast forest sections, some rocky and technical terrain, and even some mud near the end. But the real highlight came when the trail climbed higher into the mountains and suddenly opened up into what looked like a huge plateau with incredible views in every direction.</p>' +
      '<p>Sometimes the best rides happen when you simply follow a path you\'ve never taken before.</p>' +
      '<p>This ride was done on the 8th of March 2026.</p>' +
      '<p>If you enjoy adventure riding, consider subscribing for more rides like this!</p>',
    i18n: {
      fr: {
        title: 'Exploration tout-terrain en solo récompensée par des vues incroyables | Himalayan 450',
        location: 'Entre Svoge et Gintsi, Bulgarie',
        description:
          '<p>La balade d’hier s’est transformée en une de ces aventures inattendues dont on se souvient longtemps.</p>' +
          '<p>J’ai choisi au hasard un sentier sur la carte que je n’avais jamais exploré et j’ai décidé de voir où il me mènerait. Ce qui avait commencé comme une simple curiosité est rapidement devenu une formidable balade tout-terrain.</p>' +
          '<p>Le sentier avait tout : des sections forestières rapides, un terrain rocheux et technique et même un peu de boue vers la fin. Mais le vrai temps fort est arrivé quand le sentier grimpait plus haut dans la montagne et s’ouvrait soudain sur ce qui ressemblait à un immense plateau, avec des vues incroyables dans toutes les directions.</p>' +
          '<p>Parfois, les meilleures balades arrivent quand on suit simplement un chemin qu’on n’a jamais pris avant.</p>' +
          '<p>Cette balade a été réalisée le 8 mars 2026.</p>' +
          '<p>Si vous aimez les balades d’aventure, pensez à vous abonner pour en découvrir plus comme celle-ci !</p>'
      },
      bg: {
        title: 'Solo офроуд изследване, възнаградено с невероятни гледки | Himalayan 450',
        location: 'Между Своге и Гинци, България',
        description:
          '<p>Вчерашното пътуване се превърна в едно от тези неочаквани приключения, които помниш дълго време.</p>' +
          '<p>Избрах на случаен принцип пътека от картата, която никога не бях изследвал, и реших да видя къде води. Това, което започна като проста любопитност, бързо се превърна в страхотно офроуд пътуване.</p>' +
          '<p>Пътеката имаше всичко: бързи горски отрезки, скалист и технически терен и дори малко кал в края. Но истинският хайлайт дойде, когато пътеката се изкачи по-високо в планината и изведнъж се отвори на това, което приличаше на огромно плато с невероятни гледки във всички направления.</p>' +
          '<p>Понякога най-добрите пътувания се случват, когато просто поемеш по път, по който никога не си ходил.</p>' +
          '<p>Това пътуване е от 8 март 2026 г.</p>' +
          '<p>Ако обичате карането на авентюр мотоциклети, помислете за абонамент за още пътувания като това!</p>'
      }
    }
  },
  {
    slug: 'tet-bulgaria-section-09',
    title: 'TET Bulgaria Section 09 - Himalayan 450 solo off-road ride',
    youtubeId: 'G2kEABDk5ys',
    date: '2026-03-01',
    location: 'Lokorsko → Svoge, Bulgaria',
    distance: 32.8,
    gain: 1711,
    duration: '1h 50min',
    gpx: 'data/gpx/tet-bulgaria-section-09.gpx',
    isTet: true,
    marker: [42.86954, 23.42655],
    center: [42.86954, 23.42655],
    zoom: 11,
    description:
      '<p>Riding my Royal Enfield Himalayan 450 off-road on Section 09 of the Trans Euro Trail in Bulgaria. This ride features muddy tracks, challenging terrain, and some beautiful scenic views along the way.</p>' +
      '<p>As a beginner in off-road riding, this section of the trail turned out to be more demanding than expected. The deep mud, uneven tracks, melted snow and slippery conditions made for a challenging but great experience. This ride was done on the 1st of March 2026.</p>' +
      '<p>The Trans Euro Trail (TET) is a network of off-road routes crossing Europe, designed for adventure and dual-sport motorcycles. The Bulgarian sections offer a mix of forest roads, mountain trails, and incredible landscapes.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring off-road routes, consider subscribing!</p>',
    i18n: {
      fr: {
        title: 'TET Bulgarie, section 09 – Balade solo tout-terrain en Himalayan 450',
        location: 'Lokorsko → Svoge, Bulgarie',
        description:
          '<p>En balade tout-terrain sur ma Royal Enfield Himalayan 450, sur la section 09 du Trans Euro Trail en Bulgarie. Cette balade comporte des pistes boueuses, un terrain exigeant et quelques beaux points de vue sur le chemin.</p>' +
          '<p>En tant que débutant en tout-terrain, cette section s’est avérée plus exigeante que prévu. La boue profonde, les pistes inégales, la neige fondue et les conditions glissantes ont fait de ce passage une expérience difficile mais géniale. Cette balade a été réalisée le 1er mars 2026.</p>' +
          '<p>Le Trans Euro Trail (TET) est un réseau de routes tout-terrain traversant l’Europe, conçu pour les motos d’aventure et dual-sport. Les sections bulgares offrent un mélange de routes forestières, de sentiers de montagne et de paysages incroyables.</p>' +
          '<p>Si les motos d’aventure, les trails et l’exploration de routes tout-terrain vous plaisent, pensez à vous abonner !</p>'
      },
      bg: {
        title: 'TET България, секция 09 – Solo офроуд с Himalayan 450',
        location: 'Локорско → Своге, България',
        description:
          '<p>Офроуд с моя Royal Enfield Himalayan 450 по секция 09 на Trans Euro Trail в България. Пътуването включва кални пътеки, предизвикателен терен и някои красиви гледки по пътя.</p>' +
          '<p>Като начинаещ в офроуд карането, тази секция се оказа по-изискваща, отколкото очаквах. Дълбоката кал, неравните пътеки, разтопеният сняг и катеречивите условия направиха преживяването предизвикателно, но чудесно. Пътуването е от 1 март 2026 г.</p>' +
          '<p>Trans Euro Trail (TET) е мрежа от офроуд маршрути, минаваща през Европа, предназначена за авентюр и дуал спорт мотоциклети. Българските секции предлагат смесица от горски пътища, планински пътеки и невероятни пейзажи.</p>' +
          '<p>Ако обичате авентюр мотоциклети, офроуд пътеки и проучването на маршрути, абонирайте се!</p>'
      }
    }
  }
];
