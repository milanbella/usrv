function test_testGet(url, queryParams) {

  function apiCall() {

    query = ""
    if (queryParams) {
      query = '?' + (new URLSearchParams(queryParams)).toString();
    }
    let result = fetch(`${url}${query}`);

    return result.then(function (response) {
      if (response.status == 200) {
        return response.json();
      } else {
        console.error(`${url} call failed: status ${response.status}`);
        return Promise.reject();
      }
    }, function (err) {
        console.error(`${url} call failed`, err);
        return Promise.reject();
    });
  }

  let elem_a = document.querySelector('#testGet');
  let elem_r = document.querySelector('#testGet_result');
  let elem_u = document.querySelector('#testGet_url');

  elem_u.innerHTML = `${url}`;


  elem_a.addEventListener('click', function (event) {
    elem_r.innerHTML = "";
    apiCall().then(function (result) {
      elem_r.innerHTML = JSON.stringify(result);
    }, function () {
      elem_r.innerHTML = 'error!';
    })
  });

}

function test_testPost(url) {

  function apiCall() {
    let jsonBody;

    try {
      jsonBody = JSON.parse(elem_j.value)
    } catch (err) {
      console.error('could not parse json', err);
      return Promise.reject();
    }

    let result = fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(jsonBody), 
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return result.then(function (response) {
      if (response.status == 200) {
        return response.json();
      } else {
        console.error(`${url} call failed: status ${response.status}`);
        return Promise.reject();
      }
    }, function (err) {
        console.error(`$url} call failed`, err);
        return Promise.reject();
    });

    console.dir(result);
  }

  let elem_j = document.querySelector('#testPost_json');
  let elem_r = document.querySelector('#testPost_result');
  let elem_b = document.querySelector('#testPost_button');
  let elem_u = document.querySelector('#testPost_url');

  elem_u.innerHTML = `${url}`;

  //@@@@@@@@@@@@@@@@@@@@@@@
  console.dir(elem_j);
  console.dir(elem_r);
  console.dir(elem_b);
  console.dir(elem_u);
  //@@@@@@@@@@@@@@@@@@@@@@@

  elem_b.addEventListener('click', function (event) {
    elem_r.innerHTML = "";
    apiCall().then(function (result) {
      elem_r.innerHTML = JSON.stringify(result);
    }, function () {
      elem_r.innerHTML = 'error!';

    })
  });
}

test_testGet('/api/user');
test_testPost('/api/user/userVerifyJwt');
