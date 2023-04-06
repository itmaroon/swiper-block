let mySwiper = new Swiper ('.swiper', {
  
  //スライダーを自動再生する場合は以下のコメントを外す
  /*autoplay: {
    delay: 4000, //4秒間隔でスライドを自動的に実行
  },*/
  
  //最後に達したら先頭に戻る
  loop: true, 
  //ページネーション表示の設定
  pagination: { 
    el: '.swiper-pagination', //ページネーションの要素
    type: 'bullets', //ページネーションの種類
    clickable: true, //クリックに反応させる
  },
 
  //ナビゲーションボタン（矢印）表示の設定
  navigation: { 
    nextEl: '.swiper-button-next', //「次へボタン」要素の指定
    prevEl: '.swiper-button-prev', //「前へボタン」要素の指定
  },
 
  //スクロールバー表示の設定
  scrollbar: { 
    el: '.swiper-scrollbar', //要素の指定
  },
})