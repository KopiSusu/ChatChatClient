/* @flow */
import React from 'react'
import {
	IoSocialWhatsappOutline, 
	IoSocialFacebook, 
	IoEmail, 
	IoIosBell,
	IoChevronDown,
	IoPlusCircled,
	IoPlus,
	IoPricetags,
	IoFiling,
	IoChatboxes,
	IoRecord,
	IoCloseCircled,
	IoIosSearchStrong,
	IoAndroidStar,
	IoAndroidStarOutline,
	IoAndroidMoreVertical,
	IoSocialUsd,
	IoGearA,
	IoPin,
	IoMinus,
	IoPersonAdd,
	IoChatbubble,
	IoPerson,
	IoChatbubbles,
	IoClipboard,
	IoFunnel,
	IoIosBox,
	IoHappy,
	IoChatboxWorking,
	IoImages,
	IoAndroidCheckboxOutlineBlank,
	IoTrashB,
	IoRefresh,
	IoAndroidCheckboxOutline,
	IoDocumentText,
	IoIosPaperOutline,
	IoIosCopyOutline,
	IoIosCompose,
	IoIosCopy,
	IoArrowLeftC,
	IoIosCart,
	IoIosCartOutline,
	IoArrowUpB,
	IoIosAlbumsOutline,
	IoSocialDropboxOutline,
	IoIosInformation,
	IoIosCircleFilled,
	IoIosCircleOutline,
	IoArrowDownB,
	IoAndroidTextsms,
	IoLogOut,
	IoIosFiling
} from 'react-icons/lib/io'

class Icon extends React.Component {
	render() {
		return (
			<div 
				className={ (this.props.iconClass ? this.props.iconClass : '' ) + (this.props.under ? ' under' : '' ) + " icon"}
			>
				{this.renderIcon()}
				{
					this.props.under ? (
						<p>{this.props.under}</p>
					) : null
				}
			</div>
		);
	}

	renderIcon() {
    	switch (this.props.icon) {
	        case 'Whatsapp':
	          	return <IoSocialWhatsappOutline/>
	        case 'Facebook':
	          	return <IoSocialFacebook/>
	        case 'LogOut':
	        	return <IoLogOut/>
	        case 'Inquery':
	        	return <IoIosInformation/>
	        case 'Email':
	          	return <IoEmail/>
	        case 'SMS':
	        	return <IoAndroidTextsms/>
	        case 'Plus':
	         	return <IoPlusCircled/>
	        case 'PlusOutline':
	        	return <IoPlus/>
	        case 'Bell':
	         	return <IoIosBell/>
	        case 'Down':
	        	return <IoChevronDown/>
	        case 'Circle':
	        	return <IoRecord/>
	        case 'FillCircle':
	        	return <IoIosCircleFilled/>
	        case 'UnfillCircle':
	        	return <IoIosCircleOutline/>
	        case 'Close':
	        	return <IoCloseCircled/>
	        case 'Search':
	        	return <IoIosSearchStrong/>
	        case 'StarOutline':
	        	return <IoAndroidStarOutline/>
	        case 'Options':
	        	return <IoAndroidMoreVertical/>
	        case 'Cash':
	        	return <IoSocialUsd/>
	        case 'Gear':
	        	return <IoGearA/>
	        case 'Chats':
	        	return <IoChatbubbles/>
	        case 'Posts':
	        	return <IoImages/>
	        case 'EmptyChat':
	        	return <IoChatbubble/>
	        case 'AddPerson':
	        	return <IoPersonAdd/>
	        case 'Person':
	        	return <IoPerson/>
	        case 'Pin':
	        	return <IoPin/>
	        case 'Write':
	        	return <IoIosCompose/>
	        case 'Happy':
	        	return <IoHappy/>
	        case 'Orders':
	        	return <IoClipboard/>
	        case 'Order':
	        	return <IoDocumentText/>
	        case 'Products':
	        	return <IoPricetags/>
	       	case 'Conversation':
	        	return <IoChatboxes/>
	        case 'Mail':
	        	return <IoIosFiling/>
	        case 'Cart':
	        	return <IoIosCart/>
	        case 'CheckEmpty':
	        	return <IoAndroidCheckboxOutlineBlank/>
	        case 'Refresh':
	        	return <IoRefresh/>
	        case 'Check':
	        	return <IoAndroidCheckboxOutline/>
	       	case 'Left':
	       		return <IoArrowLeftC/>
	       	case 'Increment':
	       		return <IoArrowUpB/>
	       	case 'Decrement':
	       		return <IoArrowDownB/>
	       	case 'Minus':
	       		return <IoMinus/>
	       	case 'CopyOutline':
	       		return <IoIosCopyOutline/>
	       	case 'Copy':
	       		return <IoIosCopy/>
	       	case 'Empty':
	       		return <IoIosCartOutline/>
	       	case 'Receipt':
	       		return <IoIosPaperOutline/>
	       	case 'Trash':
	       		return <IoTrashB/>
      	}
    }
}

export default Icon;