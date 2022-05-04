const defaultVariant = 'ru';

class Localization  {
    locales = {
        ru : {
            'exchangeRate': 'Валютный курс',

            'alert1Title': 'Привет!', 
            'alert1Body': 'Это обучающая игра, связанная с блокчейн технологиями.\nСейчас ты пройдешь небольшое обучение.',
            'alert2Title': 'Кликаем', 
            'alert2Body': 'Это твой персональный компьютер.\nКликай сюда и получай\nкриптовалюту!',
            'alert3Title': 'Это магазин', 
            'alert3Body': 'Это магазин.\nЗдесь ты можешь купить\n и улучшить свои компьютеры.',
            'alert4Title': 'Магазин технологий', 
            'alert4Body': 'Это магазин технологий.\nЗдесь ты можешь купить новые технологии для развития сети.',
            'alert5Title': 'Блокчейн библиотека', 
            'alert5Body': 'Эта страница содержит информацию\nо блокчейне.',
            'alert6Title': 'Обменник', 
            'alert6Body': 'Это обменник.\nОн позволяет обменивать криптовалюту на деньги.\nВы можете обменять всю (100%) или половину (50%) своей криптовалюты.',
            'alert7Title': 'Валюта', 
            'alert7Body': 'Вверху вы можете увидеть свои валюты: деньги и криптовалюту.\nДеньги используются для обновления компьютеров,\nкриптовалюта - для покупки новых технологий.',
            'alert8Title': "Это всё",
            'alert8Body': 'Играй. Кликай. Зарабатывай. Изучай.',

            'blockchainLibrary1': 'Блокчейн для всех',
            'blockchainLibrary2': 'Тема',

            'mainScene1': 'Пожалуйста, измените ориентацию на горизонтальную.',
            'mainScene2': 'Тема 1',
            'mainScene3': 'Клик',

            'pcShop1': 'Цена',
            'pcShop2': 'Уровень',
            'pcShop3': 'Недостаточно денег',
            'pcShop4': 'Клик',
            'pcShop5': 'Тема',

            'techShop1': 'Цена',
            'techShop2':  "Недостаточно денег",
            
            'siteName': 'Кликер игра'
        },

        en: {
            'exchangeRate': 'Exchange Rate',

            'alert1Title': 'Hello!',
            'alert1Body': 'This is a learning blockchain game.\nThis is a small guide.',
            'alert2Title': 'Clicking', 
            'alert2Body': 'This is your Main PC.\nClick on it and get crypto currency.',
            'alert3Title': 'PC Shop', 
            'alert3Body': 'This is PC Shop.\nHere you can buy and upgrade your PCs.',
            'alert4Title': 'Tech Shop', 
            'alert4Body': 'This is a Tech Shop.\nHere you can buy new technologies to upgrade the Blockchain.',
            'alert5Title': 'Blockchain Library', 
            'alert5Body': 'This page contains unlocked information\nabout Blockchain.',
            'alert6Title': 'Exchanger', 
            'alert6Body': 'This is an exchanger.\nIt allows you to exchange Crypto currency to Money\nYou can exchange 100% of your Crypto or 50%.',
            'alert7Title': 'Currency', 
            'alert7Body': 'On the top you can see your currencies: Money and Crypto.\nMoney is using for upgrading PCs, Crypto - for buying new technologies.',
            'alert8Title': "That's all",
            'alert8Body': 'Play. Click. Earn. Learn.',

            'blockchainLibrary1':  'Blockchain for everyone',
            'blockchainLibrary2': 'Theme',

            'mainScene1': 'Please set your\nphone to landscape',
            'mainScene2': 'Theme 1',
            'mainScene3': 'click',

            'pcShop1': 'Price',
            'pcShop2': 'Level',
            'pcShop3': 'not enough money',
            'pcShop4': 'click',
            'pcShop5': 'Theme',

            'techShop1': 'Price',
            'techShop2':  "Not Enough Money",

            'siteName': 'Clicker Game'
        }
    };

    get variant () {
        return window.localStorage.getItem('ClickerLocalizationVariant') || defaultVariant;
    }
    set variant (lang) {
       window.localStorage.setItem('ClickerLocalizationVariant', lang)
    }

    toggleVariant () {
        if (this.variant === 'ru') {
            this.variant = 'en'
        } else {
            this.variant = 'ru'
        }

        window.localStorage.setItem('isFirstStart', 1)
        
        window.location.reload();
    }

    getLocale (localeKey) {
        const currentLocales = this.locales[this.variant];
        return currentLocales[localeKey] || ""
    } 
}


export const localization = new Localization();