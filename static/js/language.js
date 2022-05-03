let arrLang = {
    'en': {
      'contact': 'Contact us',
      'login': 'Authorization',
      'description': 'Blockchain is cutting edge technology. It opens up endless possibilities for the whole world, especially when it comes to the use of cryptocurrencies. Our game is designed to educate players on the concepts behind this state of the art technology.',
      'text': 'Do you want to make a lot of money?',
      'button': 'Start play',
      'password': 'Password',
      'tet': 'Block'
    },
  
    'ru': {
      'contact': 'Связаться с нами',
      'login': 'Авторизация',
      'description': 'Блокчейн является передовой технологией. Он открывает перед всем миром бесконечные возможности, особенно, когда дело доходит до использования криптовалют. Наша игра создана с целью обучения игроков концепциям этой современной технологии.',
      'text': 'Хочешь заработать много денег?',
      'button': 'Начинай играть',
      'password': 'Пароль',
      'tet': 'блокчейн это круто'
    }
  }
  
  document.addEventListener('DOMContentLoaded', getLocalLang)
  
  $(function() {
    $('.language').click(function() {
      let lang = $(this).attr('id')
  
      saveLocalLanguage(lang)
  
      $('.lang').each(function(index, item) {
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
    });
  });
  
  
  function saveLocalLanguage(language) {
    let langs
  
    if (localStorage.getItem('langs') === null) {
        langs = []
    } else {
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    
    langs.push(language)
    localStorage.setItem('langs', JSON.stringify(langs))
  }
  
  
  function getLocalLang() {
    let langs
    if (localStorage.getItem('langs') === null) {
        langs = []
    } else {
        langs = JSON.parse(localStorage.getItem('langs'))
    }
    langs.forEach(function (language) {
        let lang = langs[langs.length - 1]
        setTimeout(() => {
            $('.lang').each(function(index, item) {
                $(this).text(arrLang[lang][$(this).attr('key')]);
            });
        }, 0)
    })
  }