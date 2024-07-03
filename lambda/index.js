
const Alexa = require('ask-sdk-core');


const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome to Puerto Montt guide! You can ask about places to visit, local food, or ask for help. What would you like to do?',
            WELCOME_HINT_TEXT: "\"Alexa, tell me about Puerto Montt\"",
            HELLO_MESSAGE: 'Hello and welcome to the Puerto Montt skill developed by Carlos Alberto Hernandez Hernandez!',
            HELP_MESSAGE: 'You can ask me about tourist attractions, local food, music, or famous people from Puerto Montt. How can I assist you?',
            HELP_HINT_TEXT: "\"Alexa, help with the Puerto Montt app\"",
            GOODBYE_MESSAGE: 'Goodbye and thanks for exploring Puerto Montt with me!',
            GOODBYE_HINT_TEXT: "\"Alexa, Thank you for using the APL Puerto Montt skill\"",
            REFLECTOR_MESSAGE: 'You just triggered %s.',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try asking something else about Puerto Montt.',
            ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
            ERROR_HINT_TEXT: "\"\"",
            RANDOM_FACT: 'Here\'s a fact about Puerto Montt: %s',
            ANOTHER_FACT_PROMPT: 'Would you like to hear more about Puerto Montt?',
            DESCRIPTION_MESSAGE: "Puerto Montt is a port city in the south of Chile, known for its beautiful coastline and proximity to nature.",
            DESCRIPTION_HEADER_TITLE: "Puerto Montt",
            DESCRIPTION_HEADER_SUBTITLE: "APL",
            TOURIST_PLACES_INFO_EN: 'Puerto Montt offers several interesting tourist places like Angelmo for fresh seafood, the stunning Puerto Montt Cathedral, and the beautiful Alerce Andino National Park among others.',
            TYPICAL_FOOD_INFO_EN: 'Here are some typical dishes from Puerto Montt...',
            TRADITIONAL_CLOTHING_INFO_EN: 'Here’s some information about traditional clothing from Puerto Montt...',
            FAMOUS_PEOPLE_INFO_EN: 'Here are some notable figures from Puerto Montt...',
            MUSIC_INFO_EN: 'Learn about the traditional music of Puerto Montt, like the songs by Los Iracundos.',
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: '¡Bienvenido a la guía de Puerto Montt! Puedes preguntar sobre lugares para visitar, comida local o pedir ayuda. ¿Qué te gustaría hacer?',
            WELCOME_HINT_TEXT: "\"Alexa, cuéntame sobre Puerto Montt\"",
            HELLO_MESSAGE: '¡Hola y bienvenido a la skill de Puerto Montt desarrollada por Carlos Alberto Hernandez Hernandez!',
            HELP_MESSAGE: 'Puedes preguntarme sobre atracciones turísticas, comida local, música o personas famosas de Puerto Montt. ¿Cómo te puedo ayudar?',
            HELP_HINT_TEXT: "\"Alexa, ayuda con el apl Puerto Montt\"",
            GOODBYE_MESSAGE: '¡Adiós y gracias por explorar Puerto Montt conmigo!',
            GOODBYE_HINT_TEXT: "\"Alexa, gracias por usar la skill APL Puerto Montt\"",
            REFLECTOR_MESSAGE: 'Acabas de activar %s.',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Intenta preguntar algo más sobre Puerto Montt.',
            ERROR_MESSAGE: 'Lo siento, ha ocurrido un error. Por favor intenta de nuevo.',
            ERROR_HINT_TEXT: "\"\"",
            RANDOM_FACT: 'Aquí tienes un dato sobre Puerto Montt: %s',
            ANOTHER_FACT_PROMPT: '¿Te gustaría saber más sobre Puerto Montt?',
            DESCRIPTION_MESSAGE: "Puerto Montt es una ciudad portuaria del sur de Chile, conocida por su hermosa costa y su cercanía a la naturaleza.",
            DESCRIPTION_HEADER_TITLE: "puerto montt",
            DESCRIPTION_HEADER_SUBTITLE: "APL",
            TOURIST_PLACES_INFO_ES: 'Puerto Montt ofrece varios lugares turísticos interesantes como Angelmo, conocido por su marisco fresco, la impresionante Catedral de Puerto Montt, y el hermoso Parque Nacional Alerce Andino, entre otros.',
            TYPICAL_FOOD_INFO_ES: 'Aquí tienes algunos platos típicos de Puerto Montt...',
            TRADITIONAL_CLOTHING_INFO_ES: 'Aquí tienes información sobre la vestimenta tradicional de Puerto Montt...',
            FAMOUS_PEOPLE_INFO_ES: 'Aquí tienes algunas figuras notables de Puerto Montt...',
            MUSIC_INFO_ES: 'Conoce sobre la música tradicional de Puerto Montt, como las canciones de Los Iracundos.',
        }
    }
};


const touristPlacesPhrases = [
    "En Puerto Montt puedes visitar Angelmo, un mercado pintoresco conocido por su marisco fresco y artesanía local.",
    "La Catedral de Puerto Montt es una hermosa catedral con arquitectura impresionante.",
    "El Parque Nacional Alerce Andino es un parque nacional con senderos y paisajes naturales asombrosos.",
    "El Museo Juan Pablo II ofrece una visión de la historia y cultura de la región.",
    "La playa Pelluco es un hermoso lugar para disfrutar del mar y el paisaje."
];
const typicalFoodPhrases = [
    "En Puerto Montt puedes disfrutar de un delicioso Curanto, un plato tradicional de mariscos, carnes y vegetales cocidos en un hoyo en la tierra.",
    "El Caldillo de Congrio es una sopa de pescado que no puedes dejar de probar.",
    "El Milcao es un pastel de papa que se mezcla con chicharrones, muy típico de la región.",
    "Las empanadas de mariscos son una delicia que debes probar en Puerto Montt.",
    "El Chapalele es otra especialidad a base de papa que encontrarás en esta ciudad."
];
const traditionalClothingPhrases = [
    "El traje típico de Puerto Montt incluye la vestimenta chilota, que es conocida por sus tejidos de lana y sombreros de chupalla.",
    "Otra vestimenta tradicional es el chamanto, un poncho elegante que se utiliza en ocasiones especiales.",
    "Los trajes típicos reflejan la herencia cultural de la región, incluyendo faldas largas y blusas bordadas."
];
const famousPeoplePhrases = [
    "En Puerto Montt, uno de los personajes más conocidos es Pablo Neruda, el famoso poeta chileno.",
    "Gabriela Mistral, ganadora del Premio Nobel de Literatura, también es una figura destacada de la región.",
    "Violeta Parra, una influyente folclorista y artista, tiene un legado significativo en Puerto Montt."
];
const musicPhrases = [
    "La música típica de Puerto Montt incluye la cueca, que es el baile nacional de Chile.",
    "También puedes escuchar música folclórica que utiliza instrumentos tradicionales como la guitarra y el charango.",
    "Las bandas de cumbia y la música ranchera son populares en las festividades locales."
];


const touristPlacesPhrasesIngles = [
    "In Puerto Montt, you can visit Angelmo, a picturesque market known for its fresh seafood and local crafts.",
    "The Puerto Montt Cathedral is a beautiful church with impressive architecture.",
    "Alerce Andino National Park is a national park with amazing trails and natural landscapes.",
    "The Juan Pablo II Museum offers insights into the history and culture of the region.",
    "Pelluco Beach is a beautiful place to enjoy the sea and the landscape."
];

const typicalFoodPhrasesIngles = [
    "In Puerto Montt, you can enjoy a delicious Curanto, a traditional dish of seafood, meats, and vegetables cooked in a hole in the ground.",
    "Caldillo de Congrio is a fish soup that you must try.",
    "Milcao is a potato cake mixed with pork cracklings, very typical of the region.",
    "Seafood empanadas are a delight that you must try in Puerto Montt.",
    "Chapalele is another specialty based on potatoes that you will find in this city."
];

const traditionalClothingPhrasesIngles = [
    "The traditional costume of Puerto Montt includes Chilote clothing, which is known for its woolen fabrics and chupalla hats.",
    "Another traditional garment is the chamanto, an elegant poncho used on special occasions.",
    "The traditional costumes reflect the cultural heritage of the region, including long skirts and embroidered blouses."
];

const famousPeoplePhrasesIngles = [
    "In Puerto Montt, one of the most well-known figures is Pablo Neruda, the famous Chilean poet.",
    "Gabriela Mistral, Nobel Prize winner in Literature, is also a prominent figure from the region.",
    "Violeta Parra, an influential folklorist and artist, has a significant legacy in Puerto Montt."
];

const musicPhrasesIngles = [
    "The typical music of Puerto Montt includes the cueca, which is the national dance of Chile.",
    "You can also listen to folk music that uses traditional instruments such as the guitar and charango.",
    "Cumbia bands and ranchera music are popular at local festivities."
];



const DOCUMENT_ID_BIENVENIDO = "bienvenidoWelcome";
const DOCUMENT_ID_DESCRIPCION = "Bienvenido3";
const DOCUMENT_ID_TOURISTPLACES = "TouristPlacesAPL";
const DOCUMENT_ID_TypicalFood = "TypicalFoodAPL";
const DOCUMENT_ID_TraditionalClothingAPL = "TraditionalClothingAPL";
const DOCUMENT_ID_FamousPeopleAPL = "FamousPeopleAPL";
const DOCUMENT_ID_MusicAPL = "MusicaAPL3";
const DOCUMENT_ID_SALIR = "Salir";
const DOCUMENT_ID_ERROR = "Error";
const DOCUMENT_ID_AYUDA = "Ayuda";


const BienvenidoDatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Bienvenido a Puerto Montt APL"
                }
            },
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": "\"Alexa, abre aplchileca\""
        }
    }
};

const descriptionDatasource = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
            "displayFullscreen": false,
            "headerTitle": "puerto montt",
            "headerSubtitle": "APL",
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "videoControlType": "skip",
            "videoSources": [
                "https://prueb20210680.s3.us-east-2.amazonaws.com/Puerto_Montt+_Chile_v720P.mp4"
            ],
            "sliderType": "determinate"
        }
    }
};

const descriptionDatasource2 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Puerto Montt es una ciudad portuaria del sur de Chile, conocida por su hermosa costa y su cercanía a la naturaleza."
                }
            },
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": "\"Alexa, descripción de puerto montt\"",
            "videoSource": "https://prueb20210680.s3.us-east-2.amazonaws.com/Puerto_Montt+_Chile_v720P.mp4"
        }
    }
};

const TouristPlacesAPLDatasource = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                    "size": "large"
                }
            ]
        },
        "title": "puerto montt",
        "listItems": [
            {
                "primaryText": "Angelmo",
                "imageSource": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/dd/bc/7f/palafitos-construcciones.jpg?w=1200&h=-1&s=1"
            },
            {
                "primaryText": "Catedral de Puerto Montt",
                "imageSource": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/83/e5/74/dsc05270-largejpg.jpg?w=1200&h=-1&s=1"
            },
            {
                "primaryText": "parque nacional alerce andino",
                "imageSource": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/85/7b/79/caption.jpg?w=1200&h=-1&s=1"
            },
            {
                "primaryText": "Museo Juan Pablo II",
                "imageSource": "https://www.infobae.com/new-resizer/Ksfb1VIVZVgdQ7jzPNbsBS-_fbI=/992x850/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/S37QQG5HOFADXJ6VWG5TUSERNE.jpg"
            },
            {
                "primaryText": "La playa Pelluco",
                "imageSource": "https://www.puertomontt.cl/wp-content/uploads/2024/03/Barco-Pelluco-2.jpg"
            }
        ],
        "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
        "hintText": "\"Alexa, lugares turísticos en puerto montt\""
    }
};

const TypicalFoodAPLDatasource = {
    "cardsLayoutTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
            "headerTitle": "puerto montt",
            "headerSubtitle": "APL",
            "headerAttributionImage": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "primaryText": "Comida Típica de Puerto Montt",
            "listItems": [
                {
                    "primaryText": "Curanto",
                    "secondaryText": "Plato tradicional de mariscos",
                    "thumbnailImage": "https://chileestuyo.cl/wp-content/uploads/2021/08/curanto-magallanico.jpg"
                },
                {
                    "primaryText": "Caldillo de congrio",
                    "secondaryText": "Sopa de pescado",
                    "thumbnailImage": "https://i.ytimg.com/vi/Zv_DUSzZblo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLApFiRtugb9qTCArXOC1aVSMEzhcg"
                },
                {
                    "primaryText": "Milcao",
                    "secondaryText": "Pastel de papa",
                    "thumbnailImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOWgxqKJuWNyd4A83zUBToJc_szA1RWob7Q&s"
                },
                {
                    "primaryText": "Empanadas de mariscos",
                    "secondaryText": "Mariscos",
                    "thumbnailImage": "https://ombligoparao.cl/wp-content/uploads/2023/04/Receta-de-Empanadas-de-Mariscos.jpg"
                },
                {
                    "primaryText": "Chapalele",
                    "secondaryText": "Especialidad a base de papa",
                    "thumbnailImage": "https://upload.wikimedia.org/wikipedia/commons/2/28/Chapalele.jpg"
                }
            ]
        }
    }
};

const TraditionalClothingAPDdatasource = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                    "size": "large"
                }
            ]
        },
        "title": "puerto montt",
        "listItems": [
            {
                "primaryText": "Vestimenta chilota",
                "imageSource": "https://qph.cf2.quoracdn.net/main-qimg-4b10828318a43e050bf9f1cb2646a7e8-pjlq"
            },
            {
                "primaryText": "Chamanto",
                "imageSource": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/APEC2004_Chamanto.jpg/250px-APEC2004_Chamanto.jpg"
            },
            {
                "primaryText": "Faldas largas y blusas bordadas",
                "imageSource": "https://i.etsystatic.com/13611972/r/il/baec42/2649633721/il_1080xN.2649633721_jvzl.jpg"
            }
        ],
        "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
        "hintText": "\"Alexa, ropa típica de puerto montt\""
    }
};

const FamousPeopleAPLDdatasource = {
    "imageListData": {
        "type": "object",
        "objectId": "paginatedListSample",
        "title": "puerto montt",
        "listItems": [
            {
                "primaryText": "Pablo Neruda",
                "secondaryText": "Famoso poeta chileno",
                "imageSource": "https://i.ytimg.com/vi/_oWnkHXJfmQ/maxresdefault.jpg"
            },
            {
                "primaryText": "Gabriela Mistral",
                "secondaryText": "Ganadora del Premio Nobel de Literatura",
                "imageSource": "https://pbs.twimg.com/media/DwkkE-bWkAEI5I_.jpg:large"
            },
            {
                "primaryText": "Violeta Parra",
                "secondaryText": "Una influyente folclorista y artista",
                "imageSource": "https://revistauniversitaria.uc.cl/wp-content/uploads/2022/03/01PORTADA-640x360.jpg"
            }
        ],
        "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg"
    }
};

const MusicAPlDatasource = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "jump30",
            "audioSources": [
                "https://prueb20210680.s3.us-east-2.amazonaws.com/Puerto_Montt.mp3"
            ],
            "backgroundImage": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
            "coverImageSource": "https://m.media-amazon.com/images/I/51W12+3exwL._UXNaN_FMjpg_QL85_.jpg",
            "headerTitle": "puerto montt",
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "primaryText": "Puerto Montt",
            "secondaryText": "Los iracundos",
            "sliderType": "determinate"
        }
    }
};

const SalirDatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Adiós, gracias por usar la skill APL Puerto Montt"
                }
            },
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": "\"Alexa, adiós\""
        }
    }
};

const ErroDatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Ocurrio un error con la skill APL Puerto Montt"
                }
            },
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": "\"Alexa, abre aplchileca\""
        }
    }
};

const AyudDatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Ayuda APL Puerto Montt"
                }
            },
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": "\"Alexa, ayuda\""
        }
    }
};



const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

function getBienvenidoDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "headlineTemplateData": {
            "type": "object",
            "objectId": "headlineSample",
            "properties": {
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                            "size": "large"
                        }
                    ]
                },
                "textContent": {
                    "primaryText": {
                        "type": "PlainText",
                        "text": i18n.t('WELCOME_MESSAGE', {lng: language})
                    }
                },
                "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                "hintText": i18n.t('WELCOME_HINT_TEXT', {lng: language})
            }
        }
    };
}


function getTouristPlacesAPLDatasource(locale) {
    const language = locale.split('-')[0];
    const hintText = language === 'es' ? "\"Alexa, lugares turísticos en Puerto Montt\"" : "\"Alexa, tell me about tourist places in Puerto Montt\"";
    return {
        "imageListData": {
            "type": "object",
            "objectId": "imageListSample",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "title": language === 'es' ? "Puerto Montt" : "Puerto Montt",
            "listItems": [
                {
                    "primaryText": language === 'es' ? "Angelmo" : "Angelmo",
                    "imageSource": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/dd/bc/7f/palafitos-construcciones.jpg?w=1200&h=-1&s=1"
                },
                {
                    "primaryText": language === 'es' ? "Catedral de Puerto Montt" : "Puerto Montt Cathedral",
                    "imageSource": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/83/e5/74/dsc05270-largejpg.jpg?w=1200&h=-1&s=1"
                },
                {
                    "primaryText": language === 'es' ? "parque nacional alerce andino" : "andean larch national park",
                    "imageSource": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/85/7b/79/caption.jpg?w=1200&h=-1&s=1"
                },
                {
                    "primaryText": language === 'es' ? "Museo Juan Pablo II" : "John Paul II Museum",
                    "imageSource": "https://www.infobae.com/new-resizer/Ksfb1VIVZVgdQ7jzPNbsBS-_fbI=/992x850/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/S37QQG5HOFADXJ6VWG5TUSERNE.jpg"
                },
                {
                    "primaryText": language === 'es' ? "La playa Pelluco" : "Pelluco beach",
                    "imageSource": "https://www.puertomontt.cl/wp-content/uploads/2024/03/Barco-Pelluco-2.jpg"
                }
            ],
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": hintText
        }
    };
}



const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        const aplData = getBienvenidoDatasource(locale);

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_BIENVENIDO, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const DescriptionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescriptionIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('DESCRIPTION_MESSAGE');

        const descriptionData = {
            "videoPlayerTemplateData": {
                "type": "object",
                "properties": {
                    "backgroundImage": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                    "displayFullscreen": false,
                    "headerTitle": requestAttributes.t('DESCRIPTION_HEADER_TITLE'),
                    "headerSubtitle": requestAttributes.t('DESCRIPTION_HEADER_SUBTITLE'),
                    "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                    "videoControlType": "skip",
                    "videoSources": [
                        "https://prueb20210680.s3.us-east-2.amazonaws.com/Puerto_Montt+_Chile_v720P.mp4"
                    ],
                    "sliderType": "determinate"
                }
            }
        };

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_DESCRIPCION, descriptionData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const TouristPlacesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TouristPlacesIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutputKey = locale.includes('es') ? 'TOURIST_PLACES_INFO_ES' : 'TOURIST_PLACES_INFO_EN';
        const speakOutput = handlerInput.attributesManager.getRequestAttributes().t(speakOutputKey);

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplData = getTouristPlacesAPLDatasource(locale);
            const aplDirective = createDirectivePayload(DOCUMENT_ID_TOURISTPLACES, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


function getTypicalFoodAPLDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "cardsLayoutTemplateData": {
            "type": "object",
            "properties": {
                "backgroundImage": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                "headerTitle": language === 'es' ? "Puerto Montt" : "Puerto Montt",
                "headerSubtitle": language === 'es' ? "APL" : "APL",
                "headerAttributionImage": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                "primaryText": language === 'es' ? "Comida Típica de Puerto Montt" : "Typical Food from Puerto Montt",
                "listItems": [
                    {
                        "primaryText": language === 'es' ? "Curanto" : "Curanto",
                        "secondaryText": language === 'es' ? "Plato tradicional de mariscos" : "Traditional seafood dish",
                        "thumbnailImage": "https://chileestuyo.cl/wp-content/uploads/2021/08/curanto-magallanico.jpg"
                    },
                    {
                        "primaryText": language === 'es' ? "Caldillo de congrio" : "Conger eel soup",
                        "secondaryText": language === 'es' ? "Sopa de pescado" : "Fish soup",
                        "thumbnailImage": "https://i.ytimg.com/vi/Zv_DUSzZblo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLApFiRtugb9qTCArXOC1aVSMEzhcg"
                    },
                    {
                        "primaryText": language === 'es' ? "Milcao" : "Milcao",
                        "secondaryText": language === 'es' ? "Pastel de papa" : "Potato cake",
                        "thumbnailImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOWgxqKJuWNyd4A83zUBToJc_szA1RWob7Q&s"
                    },
                    {
                        "primaryText": language === 'es' ? "Empanadas de mariscos" : "Seafood empanadas",
                        "secondaryText": language === 'es' ? "Mariscos" : "Seafood",
                        "thumbnailImage": "https://ombligoparao.cl/wp-content/uploads/2023/04/Receta-de-Empanadas-de-Mariscos.jpg"
                    },
                    {
                        "primaryText": language === 'es' ? "Chapalele" : "Chapalele",
                        "secondaryText": language === 'es' ? "Especialidad a base de papa" : "Potato-based specialty",
                        "thumbnailImage": "https://upload.wikimedia.org/wikipedia/commons/2/28/Chapalele.jpg"
                    }
                ]
            }
        }
    };
}


const TypicalFoodIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TypicalFoodIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutputKey = locale.includes('es') ? 'TYPICAL_FOOD_INFO_ES' : 'TYPICAL_FOOD_INFO_EN';
        const speakOutput = handlerInput.attributesManager.getRequestAttributes().t(speakOutputKey);

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplData = getTypicalFoodAPLDatasource(locale);
            const aplDirective = createDirectivePayload(DOCUMENT_ID_TypicalFood, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

function getTraditionalClothingAPLDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "imageListData": {
            "type": "object",
            "objectId": "imageListSample",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                        "size": "large"
                    }
                ]
            },
            "title": language === 'es' ? "Vestimenta de Puerto Montt" : "Traditional Clothing of Puerto Montt",
            "listItems": [
                {
                    "primaryText": language === 'es' ? "Vestimenta chilota" : "Chilote attire",
                    "imageSource": "https://qph.cf2.quoracdn.net/main-qimg-4b10828318a43e050bf9f1cb2646a7e8-pjlq"
                },
                {
                    "primaryText": language === 'es' ? "Chamanto" : "Chamanto",
                    "imageSource": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/APEC2004_Chamanto.jpg/250px-APEC2004_Chamanto.jpg"
                },
                {
                    "primaryText": language === 'es' ? "Faldas largas y blusas bordadas" : "Long skirts and embroidered blouses",
                    "imageSource": "https://i.etsystatic.com/13611972/r/il/baec42/2649633721/il_1080xN.2649633721_jvzl.jpg"
                }
            ],
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
            "hintText": language === 'es' ? "\"Alexa, ropa típica de puerto montt\"" : "\"Alexa, traditional clothing of Puerto Montt\""
        }
    };
}


const TraditionalClothingIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TraditionalClothingIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutputKey = locale.includes('es') ? 'TRADITIONAL_CLOTHING_INFO_ES' : 'TRADITIONAL_CLOTHING_INFO_EN';
        const speakOutput = handlerInput.attributesManager.getRequestAttributes().t(speakOutputKey);

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplData = getTraditionalClothingAPLDatasource(locale);
            const aplDirective = createDirectivePayload(DOCUMENT_ID_TraditionalClothingAPL, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

function getFamousPeopleAPLDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "imageListData": {
            "type": "object",
            "objectId": "paginatedListSample",
            "title": language === 'es' ? "Puerto Montt" : "Puerto Montt",
            "listItems": [
                {
                    "primaryText": language === 'es' ? "Pablo Neruda" : "Pablo Neruda",
                    "secondaryText": language === 'es' ? "Famoso poeta chileno" : "Famous Chilean poet",
                    "imageSource": "https://i.ytimg.com/vi/_oWnkHXJfmQ/maxresdefault.jpg"
                },
                {
                    "primaryText": language === 'es' ? "Gabriela Mistral" : "Gabriela Mistral",
                    "secondaryText": language === 'es' ? "Ganadora del Premio Nobel de Literatura" : "Nobel Prize in Literature winner",
                    "imageSource": "https://pbs.twimg.com/media/DwkkE-bWkAEI5I_.jpg:large"
                },
                {
                    "primaryText": language === 'es' ? "Violeta Parra" : "Violeta Parra",
                    "secondaryText": language === 'es' ? "Una influyente folclorista y artista" : "Influential folklorist and artist",
                    "imageSource": "https://revistauniversitaria.uc.cl/wp-content/uploads/2022/03/01PORTADA-640x360.jpg"
                }
            ],
            "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg"
        }
    };
}


const FamousPeopleIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FamousPeopleIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutputKey = locale.includes('es') ? 'FAMOUS_PEOPLE_INFO_ES' : 'FAMOUS_PEOPLE_INFO_EN';
        const speakOutput = handlerInput.attributesManager.getRequestAttributes().t(speakOutputKey);

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplData = getFamousPeopleAPLDatasource(locale);
            const aplDirective = createDirectivePayload(DOCUMENT_ID_FamousPeopleAPL, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

function getMusicAPLDatasource(locale) {
    const language = locale.split('-')[0]; // 'en' or 'es'
    return {
        "audioPlayerTemplateData": {
            "type": "object",
            "properties": {
                "audioControlType": "jump30",
                "audioSources": [
                    "https://prueb20210680.s3.us-east-2.amazonaws.com/Puerto_Montt.mp3"
                ],
                "backgroundImage": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                "coverImageSource": "https://m.media-amazon.com/images/I/51W12+3exwL._UXNaN_FMjpg_QL85_.jpg",
                "headerTitle": "puerto montt",
                "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                "primaryText": language === 'es' ? "Puerto Montt" : "Puerto Montt",
                "secondaryText": language === 'es' ? "Los Iracundos" : "The Iracundos",
                "sliderType": "determinate"
            }
        }
    };
}


const MusicIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MusicIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutputKey = locale.includes('es') ? 'MUSIC_INFO_ES' : 'MUSIC_INFO_EN';
        const speakOutput = handlerInput.attributesManager.getRequestAttributes().t(speakOutputKey);

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplData = getMusicAPLDatasource(locale);
            const aplDirective = createDirectivePayload(DOCUMENT_ID_MusicAPL, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


function getHelpDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "headlineTemplateData": {
            "type": "object",
            "objectId": "headlineSample",
            "properties": {
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                            "size": "large"
                        }
                    ]
                },
                "textContent": {
                    "primaryText": {
                        "type": "PlainText",
                        "text": i18n.t('HELP_MESSAGE', {lng: language})
                    }
                },
                "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                "hintText": i18n.t('HELP_HINT_TEXT', {lng: language})
            }
        }
    };
}


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        const aplData = getHelpDatasource(locale);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_AYUDA, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


function getSalirDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "headlineTemplateData": {
            "type": "object",
            "objectId": "headlineSample",
            "properties": {
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                            "size": "large"
                        }
                    ]
                },
                "textContent": {
                    "primaryText": {
                        "type": "PlainText",
                        "text": i18n.t('GOODBYE_MESSAGE', {lng: language})
                    }
                },
                "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                "hintText": i18n.t('GOODBYE_HINT_TEXT', {lng: language})
            }
        }
    };
}


const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        const aplData = getSalirDatasource(locale);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_SALIR, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
 
 function getErrorDatasource(locale) {
    const language = locale.split('-')[0]; // Extrae el código de idioma (por ejemplo, "en" de "en-US")
    return {
        "headlineTemplateData": {
            "type": "object",
            "objectId": "headlineSample",
            "properties": {
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://content.r9cdn.net/rimg/dimg/2d/7e/3650b87f-city-47542-1672d189df1.jpg?width=1200&height=630&crop=true",
                            "size": "large"
                        }
                    ]
                },
                "textContent": {
                    "primaryText": {
                        "type": "PlainText",
                        "text": i18n.t('ERROR_MESSAGE', {lng: language})
                    }
                },
                "logoUrl": "https://cdn-www.bluestacks.com/bs-images/gametiles_com.amazon.dee_.app_22.jpg",
                "hintText": i18n.t('ERROR_HINT_TEXT', {lng: language})
            }
        }
    };
}

 
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        const aplData = getErrorDatasource(locale);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_ERROR, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        const aplData = getErrorDatasource(locale);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_ERROR, aplData);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en',
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DescriptionIntentHandler,
        TouristPlacesIntentHandler,
        TypicalFoodIntentHandler,
        TraditionalClothingIntentHandler,
        FamousPeopleIntentHandler,
        MusicIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LocalizationInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();