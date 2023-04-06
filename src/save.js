/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();

	let img_elm;
	let imagesArray=[];
	//画像をレンダリングする関数
	const getImagesSave = (url, alt, caption) => {
		for(let i=0; i<url.length;i++){
			if(url.length===0){
				img_elm=null;
			}else{
				if(alt[i]) {
					img_elm= (
						<div className="swiper-slide">
							<img 
									className="card_image" 
									src={ url[i]}
									alt={ alt[i] }
							/> 
							
						</div>
					);
				}else{
					img_elm = (
						<div className="swiper-slide">
							<img 
								className="card_image" 
								src={ url[i] }
								alt=""
								aria-hidden="true"
							/> 
						</div>
						
					);
				}
			}
			imagesArray.push(img_elm);
		}
		return imagesArray;
	};
	return (
		<div { ...blockProps }>
			 <div className="slider-container">
				<div className="swiper">
					<div className="swiper-wrapper">  
						{ getImagesSave( attributes.imageUrl, attributes.imageAlt ) } 
					</div>
					<div className="swiper-pagination"></div>
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>
					<div className="swiper-scrollbar"></div>
				</div>
			</div>
		</div>
	);
}
