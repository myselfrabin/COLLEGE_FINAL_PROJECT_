import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import magheSankratiImage from '@/assets/maghe sagranti.jpg';
import chasokImage from '@/assets/chasok tangnam.jpg';
import losharImage from '@/assets/loshar.jpg';
import chaathImage from '@/assets/chhat.jpg';
import dashainImage from '@/assets/dashain.jpg';
import tiharImage from '@/assets/tihar.jpg';
import teejImage from '@/assets/teej.jpg';
import buddhaImage from '@/assets/buddhapurnima.jpeg';
import sakelaImage from '@/assets/sakela.jpg';

const festivals = [
  {
    key: 'magheSankranti',
    name: 'Maghe Sankranti',
    description: 'Festival among Rai, Limbu, and Kirat communities marking start of Magh month',
    fullDescription:
      'Maghe Sankranti is an important cultural festival among the Kirat communities such as the Rai and Limbu. It celebrates the beginning of the auspicious month of Magh, typically in January. People perform cultural dances, offer prayers, and enjoy traditional foods like yam, ghee, and sweets. The festival is also marked by rituals that symbolize the change in season and a time for spiritual renewal.',
    image: magheSankratiImage,
    duration: '1 day',
    timing: 'January',
    locations: 'Hills and rural areas',
    type: 'Cultural',
    highlights: ['Cultural dances', 'Traditional food', 'Yam and ghee', 'Auspicious rituals']
  },
  {
    key: 'chasokTangnam',
    name: 'Chasok Tangnam',
    description: 'Limbu harvest festival honoring ancestors with rituals and food',
    fullDescription:
      'Chasok Tangnam is a harvest festival celebrated mainly by the Limbu community in Koshi Pradesh. Families gather to prepare and offer traditional food to their ancestors, thanking them for the harvest. The celebration includes vibrant Limbu dances, songs, and storytelling. It strengthens community bonds and preserves the ethnic culture through festive expressions.',
    image: chasokImage,
    duration: '1 day',
    timing: 'November/December',
    locations: 'Limbu communities',
    type: 'Cultural',
    highlights: ['Offerings to ancestors', 'Cultural dances', 'Traditional food', 'Community rituals']
  },
  {
    key: 'lhosar',
    name: 'Lhosar (Tamang, Gurung & Sherpa New Year)',
    description: 'Colorful New Year with cultural attire, prayer flags, and dancing',
    fullDescription:
      'Lhosar is the New Year festival of the Tamang, Gurung, and Sherpa communities. Celebrated with great enthusiasm in areas like Dharan, it includes hoisting of prayer flags, community feasting, and traditional dances in colorful attire. It marks new beginnings and is seen as a time to clear the past year’s misfortunes and welcome prosperity and harmony.',
    image: losharImage,
    duration: '1 day',
    timing: 'December/January',
    locations: 'Dharan, hilly areas',
    type: 'Cultural',
    highlights: ['Prayer flags', 'Cultural attire', 'Songs and dances', 'Feasting']
  },
  {
    key: 'dashain',
    name: 'Dashain',
    description: 'The biggest Hindu festival celebrated with family gatherings',
    fullDescription:
      'Dashain is Nepal’s longest and most anticipated Hindu festival, celebrated over 15 days. It honors the victory of goddess Durga over evil and emphasizes family reunions, blessings from elders, and community feasts. People fly kites, buy new clothes, and perform tika and jamara rituals. The festival symbolizes the triumph of good over evil.',
    image: dashainImage,
    duration: '15 days',
    timing: 'September/October',
    locations: 'Throughout Koshi Pradesh',
    type: 'Religious',
    highlights: ['Family reunions', 'Traditional rituals', 'Kite flying', 'Feasts']
  },
  {
    key: 'tihar',
    name: 'Tihar (Diwali)',
    description: 'Festival of lights with traditional decorations',
    fullDescription:
      'Tihar is a five-day Hindu festival that honors animals like crows, dogs, and cows, as well as siblings. Homes are decorated with oil lamps and colorful rangoli patterns. The festival includes Deusi-Bhailo singing in the evenings, and the final day—Bhai Tika—celebrates the bond between brothers and sisters. It’s a festival of lights, love, and harmony.',
    image: tiharImage,
    duration: '5 days',
    timing: 'October/November',
    locations: 'All districts',
    type: 'Cultural',
    highlights: ['Oil lamps', 'Rangoli', 'Deusi-Bhailo', 'Light decorations']
  },
  {
    key: 'teej',
    name: 'Teej',
    description: "Women's festival celebrated with fasting and dancing",
    fullDescription:
      'Teej is celebrated by women who dress in red saris, fast, and sing devotional songs. It is a religious festival where women pray for the long life and prosperity of their husbands or future partners. The celebrations include ritual temple visits, group dances, and communal feasting the day before the fast.',
    image: teejImage,
    duration: '3 days',
    timing: 'August/September',
    locations: 'Urban and rural areas',
    type: 'Cultural',
    highlights: ['Red saris', 'Traditional dancing', 'Fasting', 'Temple visits']
  },
  {
    key: 'buddhaPurnima',
    name: 'Buddha Purnima',
    description: "Celebration of Buddha's birth in Buddhist communities",
    fullDescription:
      'Buddha Purnima commemorates the birth, enlightenment, and death of Lord Buddha. Buddhist monasteries hold prayer ceremonies and teachings throughout the day. Devotees light butter lamps, visit stupas, and engage in charitable acts. It is a peaceful celebration of wisdom, compassion, and spiritual insight.',
    image: buddhaImage,
    duration: '1 day',
    timing: 'April/May',
    locations: 'Buddhist monasteries',
    type: 'Religious',
    highlights: ['Monastery visits', 'Prayer ceremonies', 'Charitable acts', 'Peaceful gatherings']
  },
  {
    key: 'sakela',
    name: 'Sakela Ubhauli',
    description: 'Kirant community festival celebrating nature and harvest',
    fullDescription:
      'Sakela Ubhauli is celebrated by the Kirant communities to give thanks for good harvests and pray for future prosperity. It includes community worship of nature, especially the land and sky. Large groups gather to perform rhythmic dances in circles, accompanied by drums and chants, dressed in traditional clothing.',
    image: sakelaImage,
    duration: '2 days',
    timing: 'April/May',
    locations: 'Kirant communities',
    type: 'Cultural',
    highlights: ['Traditional dances', 'Nature worship', 'Community feast', 'Cultural performances']
  },
  {
    key: 'chathParva',
    name: 'Chhath Parva',
    description: 'Sun worship festival with river rituals',
    fullDescription:
      'Chhath is a deeply spiritual festival where devotees offer prayers to the Sun God at rivers and ponds. Rituals begin at sunrise and sunset, and women fast and sing devotional songs. It’s a visually striking festival, with rituals performed standing in water. Chhath reflects discipline, devotion, and environmental respect.',
    image: chaathImage,
    duration: '4 days',
    timing: 'October/November',
    locations: 'Rivers and water bodies',
    type: 'Religious',
    highlights: ['River worship', 'Sunrise prayers', 'Community gathering', 'Traditional songs']
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Religious':
      return 'bg-blue-100 text-blue-800';
    case 'Cultural':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function FestivalsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { festivalKey } = useParams<{ festivalKey?: string }>();

  // Find selected festival if any
  const selectedFestival = festivals.find(f => f.key === festivalKey);

  if (selectedFestival) {
    // Show detailed view
    const f = selectedFestival;

    return (
      <section className="py-16 bg-background">
        <div className="container-responsive">
          <Button
            variant="ghost"
            onClick={() => navigate('/festivals')}
            className="mb-8"
          >
            ← Back to Festivals
          </Button>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={f.image}
                alt={f.name}
                className="w-full h-96 object-cover rounded-lg shadow-large"
              />
            </div>

            <div className="space-y-6">
              <div>
                <Badge className={getTypeColor(f.type)} variant="secondary">
                  {f.type}
                </Badge>
                <h1 className="text-4xl font-bold mb-4 mt-2">{f.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{f.description}</p>
                <p className="text-base text-muted-foreground">{f.fullDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-muted-foreground">{f.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Timing</p>
                    <p className="text-muted-foreground">{f.timing}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Locations</p>
                    <p className="text-muted-foreground">{f.locations}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Festival Highlights
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {f.highlights.map((highlight, i) => (
                    <Badge key={i} variant="outline" className="justify-start">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => navigate('/plan-trip')}
                >
                  Plan Visit
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show list view
  return (
    <section className="py-16 bg-muted/50">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.festivals')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the vibrant festivals and cultural celebrations of Koshi Pradesh
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((festival) => (
            <Card
              key={festival.key}
              className="group card-hover cursor-pointer overflow-hidden"
              onClick={() => navigate(`/festivals/${festival.key}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className={getTypeColor(festival.type)} variant="secondary">
                      {festival.type}
                    </Badge>
                    <h3 className="text-white font-semibold text-lg mt-2">{festival.name}</h3>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm mb-4">{festival.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {festival.timing}
                  </span>
                  <span>{festival.duration}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/festivals/${festival.key}`);
                  }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
