import Swal from 'sweetalert2';
import dayjs from 'dayjs'

export const isObject = (x) => {
  return typeof x === 'object' && !Array.isArray(x) && x !== null
}

export const isObjectEmpty = (object) => {
  return Object.keys(object) === 0
}

export const isString = (x) => {
  return (typeof x === 'string' || x instanceof String)
}

export const isDefined = (x) => {
  return typeof x !== 'undefined'  
}

export const isUndefined = (x) => {
  return typeof x === 'undefined'  
}

export const isArraytNull = (array) => {
  return array.every((element) => element === null)
}

export const isObjectNull = (object) => {
  return isArraytNull(Object.values(object))
}

export const isArray = (x) => {
  return Array.isArray(x)
}

export const unique = (array, key = null) => {
  if (!Array.isArray(array)) return [];

  if (!key) {
    // For primitive values (string, number, etc.)
    return [...new Set(array)];
  } else {
    // For objects, unique by key
    const seen = new Set();
    return array.filter(item => {
      if (typeof item === 'object' && item !== null && key in item) {
        if (seen.has(item[key])) {
          return false;
        } else {
          seen.add(item[key]);
          return true;
        }
      }
      return false;
    });
  }
};

export const difference = (array1, array2) => {
  let result = {}
  result["add"] = array1.filter((item) => !array2.includes(item));
  result["subtract"] = array2.filter((item) => !array1.includes(item));
  return result
}

export const isNumber = (x) => {
  return typeof x === "number"
}

export const isNumberString = (x) => {
  return !isNaN(x)
}

export const isNumberOrNumberString = (x) => {
  return isNumber(x) || isNumberString(x)
}


export const pluck = (array, ...keys) => {
  return array.map(item => {
    return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), item);
  });
};

export const minTime = (times) => {
  const minTime = times.reduce((min, current) => {
    return current < min ? current : min;
  }, times[0]);
  return minTime
}

export const maxTime = (times) => {
  const maxTime = times.reduce((max, current) => {
    return current > max ? current : max;
  }, times[0]);
  return maxTime
}

export const randomID = () => {
  return Math.random().toString(36).substr(2, 9);
}

export const isEmpty = (x) => {
  if (isObject(x)) { return isObjectNull(x) }
  if (isArray(x)) { return x.length === 0 }
  if (isString(x)) { return x === "" }
  if (isNumber(x)) { return false }
  return true
}

export const transferToValue = (value) => {
  let newValue = JSON.stringify(value).replace(/"/g, '&quot;')
  return newValue
}

export const identifier = (controller) => {
  let identifier
  identifier = controller.name
  identifier = identifier.replace('Controller', '')
  identifier = identifier.replaceAll('_', 'NAMESPACE')
  identifier = identifier
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  .map(x => x.toLowerCase())
  .join('-');
  identifier = identifier.replaceAll('namespace', '')
  return identifier
}

export const isBoolean = (x) => {
  return typeof x === 'boolean'
}

export const isBooleanString = (x) => {
  return x === 'true' || x === 'false'
}

export const csrfToken = () => {
  const csrf = document.querySelector('meta[name="csrf-token"]')
  return csrf.content
}

// findBy with a key value pair for array of objects
export const findBy = (array, key, value) => {
  return array.find(object => object[key] === value)
}

export const camelCaseToUnderscore = (str) => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}





// COOKIE

// // get Cookie object
export const Cookie = (name) => {
  let cookie = {}
  document.cookie.split(';').forEach(function(el) {
    let [k,v] = el.split('=');
    let value = decodeURIComponent(v);
    value = value.replace("+", ' ');
    cookie[k.trim()] = value;
  })
  if (name) {
    return cookie[name]
  } else {
    return cookie
  }
}

// set Cookie object
export const setCookie = (name, value, days) => {
  let expires = ""
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days*24*60*60*1000))
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + value + expires + "; path=/"
}

// check isSignedIn by check is_signed_in in cookie
export const isSignedIn = () => {
  return Cookie('is_signed_in') && Cookie('is_signed_in') === 'true'
}

// get avatar from cookie
export const avatarUrl = () => {
  return Cookie('avatar')
}

// get role from cookie
export const role = () => {
  return Cookie('role')
}

// get education_role from cookie
export const educationRole = () => {
  return Cookie('education_role')
}

// return avatar HTML
export const avatarHTML = (url = avatarUrl()) => {
  if (!url) {
    return `
      <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      </div>
    `
  }
  return `<img src="${url}" class="h-10 w-10 rounded-full cursor-pointer" alt="avatar">`
}

// Function to open SweetAlert2 dialog based on a parent element
export const openPopover = ({parentElement, html = "Dialog content", position = 'bottom-center-center', popupClass = ""}) => {
  // Get the parent element's position and dimensions
  const parentRect = parentElement.getBoundingClientRect();
  const parentTop = parentRect.top;
  const parentBottom = parentRect.bottom;
  const parentLeft = parentRect.left;
  const parentRight = parentRect.right;
  const parentWidth = parentRect.width;
  const parentHeight = parentRect.height;
    
  // Customize SweetAlert2 dialog
  Swal.fire({
    html: html,
    position: 'top-start', // Use 'top-start' to position the dialog at the top-left corner
    showConfirmButton: false,
    showCloseButton: false,
    // backdrop: false,
    customClass: {
      container: '!bg-transparent',
      popup: 'swal2-container-custom ' + popupClass,
      htmlContainer: '!p-0',
    },
    didOpen: (popupElement) => {
      // Adjust the dialog's position based on the parent element
      const swalContainer = document.querySelector('.swal2-container-custom');
      swalContainer.style.position = 'absolute';
      switch (position) {
        case 'top-left':
          swalContainer.style.top = `${parentTop}px`;
          swalContainer.style.left = `${parentLeft}px`;
          break;
        case 'top-right':
          swalContainer.style.top = `${parentTop}px`;
          swalContainer.style.left = `${parentRight}px`;
          break;
        case 'top-center':
          swalContainer.style.top = `${parentTop}px`;
          swalContainer.style.left = `${parentLeft + parentWidth/2}px`;
          break;

        case 'bottom-left':
          swalContainer.style.top = `${parentBottom}px`;
          swalContainer.style.left = `${parentLeft}px`;
          break;
        case 'bottom-right':
          swalContainer.style.top = `${parentBottom}px`;
          swalContainer.style.left = `${parentRight}px`;
          break;
        case 'bottom-center':
          swalContainer.style.top = `${parentBottom}px`;
          swalContainer.style.left = `${parentLeft + parentWidth/2}px`;
          break;

        case 'left-center':
          swalContainer.style.top = `${parentTop + parentHeight/2}px`;
          swalContainer.style.left = `${parentLeft}px`;
          break;
        case 'right-center':
          swalContainer.style.top = `${parentTop + parentHeight/2}px`;
          swalContainer.style.left = `${parentRight}px`;
          break;
        case 'center-center':
          swalContainer.style.top = `${parentTop + parentHeight/2}px`;
          swalContainer.style.left = `${parentLeft + parentWidth/2}px`;
          break;
      }
    },
  });
}

export const openModal = ({html = "Model!", customClass = {}, options = {}}) => {
  Swal.fire({
    html: html,
    showConfirmButton: false,
    showCloseButton: false,
    backdrop: true,
    target: document.querySelector('main'), // Default target
    customClass: {
      container: '!bg-transparent',
      popup: '!p-0 !bg-transparent !w-full',
      htmlContainer: '!p-0 !overflow-visible',
      ...customClass
    },
    ...options,
  });
}

export const openDrawer = ({html = "Drawer!", position = "top-start", popupClass = ""}) => {
  Swal.fire({
    html: html,
    position: position,
    showConfirmButton: false,
    showCloseButton: false,
    backdrop: true,
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    },
    customClass: {
      container: '!p-0',
      popup: 'swal2-container-custom h-screen',
      htmlContainer: '!p-0',
    },
  });
}

export const openFlash = (html, option = {}) => {
  Swal.fire({
    position: "top",
    html: html,
    showConfirmButton: false,
    timer: 3000,
    backdrop: false,
    customClass: {
      container: '...1',
      popup: '!p-0',
      header: '...2',
      title: '...3',
      closeButton: '...',
      icon: '...',
      image: '...',
      htmlContainer: '!p-0',
      input: '...',
      inputLabel: '...',
      validationMessage: '...',
      actions: '...',
      confirmButton: '...',
      denyButton: '...',
      cancelButton: '...',
      loader: '...5',
      footer: '....6',
      timerProgressBar: '....7',
    },
    ...option
  });
}

// Function to read and parse a CSV file as an array
export const readCSVFileToArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const contents = event.target.result
      const rows = contents.split("\n").map(row => row.split(","))
      resolve(rows)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsText(file)
  })
}

// Function to read and parse a CSV file and return data as an array of objects
export const readCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const contents = event.target.result
      const rows = contents.split("\n").map(row => row.split(","))
      const headers = rows[0]
      const data = rows.slice(1).map(row => {
        let obj = {}
        row.forEach((value, index) => {
          obj[headers[index]] = value
        })
        return obj
      })
      resolve(data)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsText(file)
  })
}

export const createForm = ({
  action = "", //form action will be pathname if not provided
  className = "",
  id = "",
  method = "", //form method will be get if not provided
  dataController = "",
  html = "",
  attributes = "",
}) => {
  const classAttribute = className ? `class="${className}"` : "";
  const idAttribute = id ? `id="${id}"` : "";
  const actionAttribute = action ? `action="${action}"` : "";
  const methodAttribute = method ? `method="${method}"` : ""; // Default to GET method if not provided
  const dataControllerAttribute = dataController ? `data-controller="${dataController}"` : "";
  const methodInput =
    method === "patch"
      ? '<input type="hidden" name="_method" value="patch" autocomplete="off">'
      : "";

  // Use the csrfToken function to get the CSRF token, If the method is not GET, include the CSRF token input
  const csrfInput = (method === "" || method === "get") ? "" : `<input type="hidden" name="authenticity_token" value="${csrfToken()}" autocomplete="off">`;

  return `
    <form ${idAttribute} ${classAttribute} ${actionAttribute} ${methodAttribute} ${dataControllerAttribute} ${attributes} accept-charset="UTF-8">
      ${methodInput}
      ${csrfInput}
      ${html}
    </form>
  `;
};

export const createSelectTag = ({
  className = "",
  id = "",
  name = "",
  dataController = "",
  options = [], // Array of objects with `value` and `text` properties, for example: [{ value: "1", text: "Option 1" }, { value: "2", text: "Option 2" }]
  values = [],
  required = false,
  multiple = false, 
  disabled = false,
  blank = false,
  blankText = "Select",
  attributes = "" 
}) => {
  // Ensure `values` is an array
  if (typeof values === "string") {
    // values = values.split(",").map(value => value.trim());
    values = [values]
  }

  // Add the `required` attribute if the input is true
  const requiredAttribute = required ? "required" : "";

  // Add the `multiple` attribute if the input is true
  const multipleAttribute = multiple ? "multiple" : "";
  
  // Add the `disabled` attribute if the input is true
  const disabledAttribute = disabled ? "disabled" : "";

  // Add the `data-controller` attribute if the input is true
  const dataControllerAttribute = dataController ? `data-controller="${dataController}"` : "";
  return `
    <select class="${className}" id="${id}" name="${name}" ${disabledAttribute} ${dataControllerAttribute} ${requiredAttribute} ${multipleAttribute} ${attributes}>
      ${blank ? `<option value="">${blankText}</option>` : ""}
      ${options.map(option => {
        const isSelected = values.includes(option.value) ? "selected" : "";
        return `<option value="${option.value}" ${isSelected}>${option.text}</option>`;
      }).join('')}
    </select>
  `;
};

export const createInputTag = ({
  type = "text", // Default input type
  id = "", // ID for the input tag
  name = "", // Name attribute
  value = "", // Default value
  placeholder = "", // Placeholder text
  required = false, // Boolean to add the required attribute
  className = "", // CSS classes
  attributes = "" // Additional attributes
}) => {
  // Add the `required` attribute if the input is true
  const requiredAttribute = required ? "required" : "";

  return `
    <input 
      type="${type}" 
      id="${id}" 
      name="${name}" 
      value="${value}" 
      placeholder="${placeholder}" 
      class="${className}" 
      ${requiredAttribute} 
      ${attributes} 
    />
  `;
};

export const createSubmitTag = ({
  id = "", // ID for the input tag
  name = "", // Name attribute
  value = "Submit", // Default value for the submit button
  className = "", // CSS classes
  attributes = "" // Additional attributes
}) => {
  return `
    <input 
      type="submit" 
      id="${id}" 
      name="${name}" 
      value="${value}" 
      class="${className}" 
      ${attributes} 
    />
  `;
};

export const initializedEvent = 'controller:initialize:completed'

export const pathname = () => {
  return window.location.pathname
}

export const href = () => {
  return window.location.href
}

export const origin = () => {
  return window.location.origin
}

export const timeFormat = (time, format = "DD/MM/YYYY") => {
  return dayjs(time).format(format)
}

export const getObjectKeys = (object) => {
  if (typeof object !== "object" || object === null) {
    throw new Error("Input must be a non-null object");
  }
  return Object.keys(object);
}

export const getObjectValues = (object) => {
  if (typeof object !== "object" || object === null) {
    throw new Error("Input must be a non-null object");
  }
  return Object.values(object);
};

export const params = () => {
  const queryString = window.location.search; // Get the query string from the URL
  const urlParams = new URLSearchParams(queryString); // Use URLSearchParams to parse the query string
  const params = {};

  // Iterate through all key-value pairs in the query string
  urlParams.forEach((value, key) => {
    params[key] = value; // Add each key-value pair to the params object
  });

  return params; // Return the params object
};

export const sortByField = (array, field, order = 'asc') => {
  if (!Array.isArray(array)) {
    throw new Error("Input must be an array");
  }

  return array.sort((a, b) => {
    if (a[field] < b[field]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0; // If values are equal
  });
};

export const render = (controller, {className = "", values = [], attributes = ""}, children = null) => {

  return `
    <div
      data-controller="${identifier(controller)}"
      class="${className}"
      ${values.map((value) => {
        return `data-${value.key}="${value.value}"`;
      }
      ).join(' ')}
      ${attributes}
    >
      ${children}
    </div>`
};