/* @flow */
/*global setTimeout*/
import moment from 'moment'

const baseUrl = 'http://chatchat.api.everybodysay.com:3000/'

export const selectItem = (item, type, secondaryProperty) => {
  
    let returnObject = {
        type: `SELECT_${type.toUpperCase()}`,
        payload: item
    }

    if (secondaryProperty)
      returnObject['secondaryProperty'] = secondaryProperty

    return returnObject;
}

export const updateItem = (item, type, secondaryProperty) => {
      let returnObject = {
        type: `UPDATE_${type.toUpperCase()}`,
        payload: item
    }

    if (secondaryProperty)
      returnObject['secondaryProperty'] = secondaryProperty

    return returnObject;
}

export const removeItem = (item, type) => {
  return {
    type: `_REMOVE_${type.toUpperCase()}`,
    payload: item
  }
}

export const submitItem = (item, type) => {
  return {
    type: '_SUBMIT_' + type,
    payload: item
  }
}

export const receiveData = (json, returnType, nestedKey) => {
	let returnResponse = {
		type: returnType,
		payload: json,
		receivedAt: Date.now()
	}
	if (nestedKey)
		returnResponse.nestedKey = nestedKey

	return returnResponse
}
export function fetchRealData(url, returnType, nestedKey) {
  return function (dispatch) {    
    // let xhr = new XMLHttpRequest();
    // The last parameter must be set to true to make an asynchronous request
    // xhr.open('GET', `https://s3.amazonaws.com/datadummy/${url}.json`, true)
    let xhr = createCORSRequest('GET', `${baseUrl}${url}`);

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response = null

        if(xhr.response !== '') 
          response = JSON.parse(xhr.response)

        dispatch(receiveData(response, returnType, nestedKey))
      } else {
        console.log('Error !');
      }
    }

    xhr.send()
    return xhr.onload
  }
}
export function postData(item, url, returnType, nestedKey) {
  return function (dispatch) { 
    let xhr = createCORSRequest('POST', `${baseUrl}${url}`);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        dispatch(receiveData(JSON.parse(xhr.response), returnType, nestedKey))
      } else {
        console.log('Error !');
      }
    }

    xhr.send(JSON.stringify(item))
    return xhr.onload
  }
}
export function postImage(dataUrl, returnUrl, selectedObject){
  return function (dispatch) {
    let formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("upload_preset", 'mqti6qm8');

    let xhr = createCORSRequest('POST', 'https://api.cloudinary.com/v1_1/ltvw42nmh/upload')

    xhr.onload = (result) => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let newMessages = {
          "account_id": 1, 
          "body": 'Shopping Cart', 
          "created_on": moment(), 
          "customer_id": 2, 
          "data": JSON.parse(xhr.response).secure_url, 
          "img_src": JSON.parse(xhr.response).secure_url, 
          "id": (Math.random() * 10000000), 
          "from": "+19179001106", 
          "read": true, 
          "source_type": "sms", 
          "tag": null, 
          "to": `+${selectedObject.mobile_number}`,
          "updated_on": moment()
        }

        dispatch(postData(newMessages, returnUrl, '_SUBMIT_MESSAGE'))
      } else {
        console.log('Error !');
      }
    }

    xhr.send(formData)

    return xhr.onload 
  }
}
export function updateData(item, url, returnType, nestedKey) {
  return function (dispatch) { 
    let xhr = createCORSRequest('PUT', `${baseUrl}${url}`);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        dispatch(receiveData(JSON.parse(xhr.response), returnType, nestedKey))
      } else {
        console.log('Error !');
      }
    }

    xhr.send(JSON.stringify(item))
    return xhr.onload
  }
}
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

