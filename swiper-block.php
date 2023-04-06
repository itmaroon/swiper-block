<?php
/**
 * Plugin Name:       Swiper Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            WebクリエーターITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       swiper-block
 *
 * @package           itmar
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function itmar_swiper_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'itmar_swiper_block_block_init' );

//Swiperプラグインの読み込み
function itmar_swiper_block_add_swiper() {
  $dir = dirname( __FILE__ );
  
  //管理画面以外（フロントエンド側でのみ読み込む）
  if(! is_admin()) {
    //Swiper の JavaScript ファイルの読み込み（エンキュー）
    wp_enqueue_script( 
      'swiper-slider', 
      plugins_url( '/assets/swiper-bundle.min.js', __FILE__ ), 
      array(), 
      filemtime( "$dir/assets/swiper-bundle.min.js" ),
      true
    );
 
    //Swiper を初期化するためのファイルの読み込み（エンキュー）
    wp_enqueue_script( 
      'swiper-slider-init', 
      plugins_url( '/assets/init-swiper.js', __FILE__ ), 
      //依存ファイルに上記 Swiper の JavaScript を指定 
      array('swiper-slider'), 
      filemtime( "$dir/assets/init-swiper.js" ),
      true
    );
 
    //Swiper の CSS ファイルの読み込み（エンキュー）
    wp_enqueue_style(
      'swipe-style',
      plugins_url( '/assets/swiper-bundle.min.css', __FILE__ ), 
      array(),
      filemtime( "$dir/assets/swiper-bundle.min.css"  )
    );
  }
  
}
add_action('enqueue_block_assets', 'itmar_swiper_block_add_swiper');
