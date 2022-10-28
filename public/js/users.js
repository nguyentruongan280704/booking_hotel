let baseApi = "http://127.0.0.1:3000/";
const tbody = document.getElementById("tbody");
const logout = document.querySelector(".signout-btn");
const rowTemplate = 
`
<tr>
    <th scope="row"><%= i +1 %></th>
    <td><%=data[i].id%></td>
    <td><%=data[i].name%></td>
    <td><%=data[i].username%></td>
    <td><%=data[i].email%></td>
    <td><%=data[i].website%></td>
    <td><%=data[i].phone%></td>
    <td><%=data[i].password%></td>
    <td>
        <span id="<%=data[i].id%>" class="btn btn-danger btn-delete">DELETE</span>
        <span id="update-<%=data[i].id%>" class="btn btn-info btn-update">UPDATE</span>
    </td>
</tr>
`;

let ul = document.querySelector(".pagination");

const showMessage = (status, message) => {
    let messageContainer = document.getElementsByClassName("message")[0];
    if(status === "delete") {
        messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
    if(status === "update") {
        messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
    setTimeout(() => {
        messageContainer.innerHTML = "";
    }, 2000);
}

tbody.addEventListener("click", (e) => {
    // console.log(e.target);
    if(e.target.classList.contains("btn-delete")) {
        let id = e.target.id;
        fetch(baseApi + `users/${id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
            showMessage("delete", data.message);
            e.target.parentElement.parentElement.remove();
            console.log(data);
        })
        .catch((err) => showMessage("delete", err.message));
    }

    if (e.target.classList.contains("btn-update")) {
        // get id
        let id = e.target.id.split("-")[1]; // update-1, update-2...
        // get current row (Lấy ra dòng hiện tại của nút update)
        let td = e.target.parentElement.parentElement;
        //Get current row children
        // Lấy toàn bộ phần tử con (td list) của dòng hiện tại
        let tdChildList = e.target.parentElement.parentElement.children;
        // Lấy ra toàn bộ thông tin user nằm trong từng ô (từng td)
        let info = {
          index: tdChildList[0].innerHTML,
          id: tdChildList[1].innerHTML,
          name: tdChildList[2].innerHTML,
          username: tdChildList[3].innerHTML,
          email: tdChildList[4].innerHTML,
          website: tdChildList[5].innerHTML,
          phone: tdChildList[6].innerHTML,
          password: tdChildList[7].innerHTML,
        };
        // Fill toàn bộ thông tin lấy được ở trên vào template dòng mới đã được thay thế bằng input.value
        td.innerHTML = `
        <tr>
            <th scope="row">
                ${info.index}
            </th>
            <td>${info.id}</td>
            <td><input type="text" value="${info.name}"></td>
            <td><input type="text" value="${info.username}"></td>
            <td>${info.email}</td>
            <td><input type="text" value="${info.website}"></td>
            <td><input type="text" value="${info.phone}"></td>
            <td class="password">${info.password}</td>
            <td class="action">
                <span id="${info.id}" class="btn-delete btn btn-danger">
                    <ion-icon name="trash-outline"></ion-icon>
                </span>
                <span id="save-${info.id}" class="btn-save btn btn-info">
                    Save
                </span>
            </td>
        </tr>
        `;
      };
      if(e.target.classList.contains("btn-save")) {
        // get id
        let id = e.target.id.split("-")[1]; // update-1, update-2...
        // get current row (Lấy ra dòng hiện tại của nút update)
        let td = e.target.parentElement.parentElement;
        //Get current row children
        // Lấy toàn bộ phần tử con (td list) của dòng hiện tại
        let tdChildList = e.target.parentElement.parentElement.children;
        // Lấy ra toàn bộ thông tin user nằm trong từng ô (từng td)
        let info = {
            index: tdChildList[0].innerHTML,
            id: tdChildList[1].innerHTML,
            name: tdChildList[2].children[0].value,
            username: tdChildList[3].children[0].value,
            email: tdChildList[4].innerHTML,
            website: tdChildList[5].children[0].value,
            phone: tdChildList[6].children[0].value,
            password: tdChildList[7].innerHTML,
          };
        //Lấy value từ ô input ra
        // .innerHTML ---> Text
        // .children ---> Mảng HTML, [0] ---> value
        console.log(info);
        //Tiến hành gọi fetch update
        fetch(baseApi + `users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            showMessage("update", data.message);
            td.innerHTML = 
                `
                    <tr>
                        <th scope="row">
                            ${info.index}
                        </th>
                        <td>${info.id}</td>
                        <td>${info.name}"</td>
                        <td>${info.username}"</td>
                        <td>${info.email}</td>
                        <td>${info.website}"</td>
                        <td>${info.phone}"</td>
                        <td class="password">${info.password}</td>
                        <td class="action">
                            <span id="${info.id}" class="btn-delete btn btn-danger">
                                <ion-icon name="trash-outline"></ion-icon>
                            </span>
                            <span id="save-${info.id}" class="btn-save btn btn-info">
                                Update
                            </span>
                        </td>
                    </tr>
                `;
        // Sửa lại module uodateOne trong uers.controller.js
            // C1: DOM đổi lại dòng hiện tại thành 1 dòng bình thường không có input input nằm ở bên trong nữa
            // C2: điều hướng
            // setTimeout(() => {
            //     window.location.href ="/users"
            // }, 3000);
            // if(data.status === "success") {
            //     console.log(data)
            //     window.location.href = "/";
            // }
        })
        //Đổi lại nut save thành icon update
        //Hiển thị ra message update thành công
      };
})

logout.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("hello");
    fetch(baseApi + "auth/logout")
        .then((res) => res.json())
        .then((res) => res.json())
        .then((res) => res.json())
})

ul.addEventListener("click", (e) => {
    console.log(e.target);
})

