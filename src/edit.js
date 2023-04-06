/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps, 
	InspectorControls, 
	MediaUpload, 
	MediaUploadCheck 
} from '@wordpress/block-editor';
import { 
	Button,
	PanelBody, 
	PanelRow, 
	ToggleControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	//選択された画像の情報（alt 属性、URL、ID）を更新する関数
	const onSelectImage = ( media ) => {
		//複数画像に対応
		const media_ID = media.map((image) => image.id);
		const imageUrl = media.map((image) => image.url);
		const imageAlt = media.map((image) => image.alt);
		const imageCaption = media.map((image) => image.caption);
		setAttributes( {
			imageAlt: imageAlt, 
			imageUrl: imageUrl, 
			mediaID: media_ID ,
			imageCaption: imageCaption
		} );
	};

	//URLの配列から画像を生成
	const getImages = (urls, captions) =>{
		let imagesArray=[];
		for(let i=0; i<urls.length;i++){
			imagesArray.push(
				<figure>
					<img
						src={ urls[i] }
						className='image'
						alt="アップロード画像"
					/>
					{ attributes.showCaption && 
						<figcaption className='block-image-caption'>
							{captions[i]}
						</figcaption>	
					}
									
				</figure>
			);			
		}
		return imagesArray;
	}
	//メディアライブラリを開くボタンをレンダリングする関数
	const getImageButton = ( open ) => {
		if(attributes.imageUrl.length > 0) {
			return (
				<div
					onClick={ open }
					className="block-container"
				>
					{
						getImages(attributes.imageUrl, attributes.imageCaption)
					}
				</div>
				
			);
		}
		else {
			return (
				<div className="button-container">
					<Button 
						onClick={ open }
						className="button button-large"
					>
						画像をアップロード
					</Button>
				</div>
			);
		}
	};

	//画像を削除する（メディアをリセットする）関数
	const removeMedia = () => {
		setAttributes({
			mediaID: [],
			imageUrl: [],
			imageAlt: [],
			imageCaption:[],
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody 
					title={ __( 'Slider Settings', 'sw_location')}
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
								label={ __( 'Navigation Button', 'sw_location')}
								checked={ attributes.showNavigationButton }
								onChange={ (val) => setAttributes({ showNavigationButton: val }) }
							/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
								label={ __( 'Pagenation', 'sw_location')}
								checked={ attributes.showPagination }
								onChange={ (val) => setAttributes({ showPagination: val }) }
							/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
								label={ __( 'Scroll Bar', 'sw_location')}
								checked={ attributes.showScrollbar }
								onChange={ (val) => setAttributes({ showScrollbar: val }) }
							/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
								label={ __( 'Show Caption', 'sw_location')}
								checked={ attributes.showCaption }
								onChange={ (val) => setAttributes({ showCaption: val }) }
							/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div className { ...blockProps }>
				<MediaUploadCheck>
					<MediaUpload
						multiple={ true }  //複数画像の選択
						gallery={ true }  //追加
						onSelect={ onSelectImage }
						allowedTypes={ ['image'] }
						value={ attributes.mediaID }
						render={ ({ open }) => getImageButton( open ) }
					/>
				</MediaUploadCheck>
				{ attributes.imageUrl.length != 0  && 
					<MediaUploadCheck>
						<Button 
							onClick={removeMedia} 
							variant="link"
							isDestructive 
							className="removeImage">画像を削除
						</Button>
					</MediaUploadCheck>
				}
			</div>
		</>
			
	);
}
