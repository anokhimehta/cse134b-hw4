window.addEventListener("DOMContentLoaded", init);

// @include("https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.0/purify.js");

let postCount = 0;
let posts = [];

function init() {
    document.getElementById("newPostBtn").addEventListener("click", newPost);
    document.getElementById("saveBtn").addEventListener("click", savePost);
    document.getElementById("cancelBtn").addEventListener("click", cancelPost);

    posts = [
        {   
            "id" : "post1",
            "title": "Post1",
            "date": "07/23/21",
            "summary": "Today I worked on my assignment for my CSE 134 class"
        },
        {
            "id" : "post2",
            "title": "Post2",
            "date": "07/25/21",
            "summary": "My EDS 124BR Class is very interesting, we are learning about computational thinking."
        },  
    ]

    localStorage.setItem("post1", `Title: ${posts[0].title} Date: ${posts[0].date} Summary: ${posts[0].summary}`);
    localStorage.setItem("post2", `Title: ${posts[1].title} Date: ${posts[1].date} Summary: ${posts[1].summary}`);

    displayLocalPosts();

}

function displayPost(post) {

    console.log(post);
    postCount++;
    let postItem = document.createElement('li');
    postItem.id = post[0];

    let postInfo = document.createElement('p');
    postInfo.textContent = post[1];

    postItem.appendChild(postInfo);

    let editBtn = document.createElement('button');
    editBtn.id = "editUser" + postCount;
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editPost);
    postItem.appendChild(editBtn);

    let delBtn = document.createElement('button');
    delBtn.id = "delUser" + postCount;
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", delPost);
    postItem.appendChild(delBtn);

    document.getElementById("postList").appendChild(postItem);
    
}

function displayLocalPosts() {
    entries = (Object.entries(localStorage))
    entries.forEach(displayPost);
}

function newPost() {
    let postDialog = document.getElementById("addPostDialog");
    postDialog.showModal();

}

function cancelPost() {
    let postDialog = document.getElementById("addPostDialog");
    postDialog.close();
    alert("Post cancelled")
}

function cancelEditPost() {
    let postDialog = document.getElementById("editPostDialog");
    editPostDialog.close();
    alert("Editing Post cancelled");
}

function savePost() {

    
    //read values
    let postDialog = document.getElementById("addPostDialog");
    let postTitle = document.getElementById("title").value;
    let postDate = document.getElementById("date").value;
    let postSummary = document.getElementById("summary").value;

    //TODO: Need to DOMPurify
    postTitle = DOMPurify.sanitize(postTitle);
    postDate = DOMPurify.sanitize(postDate);
    postSummary = DOMPurify.sanitize(postSummary);
    console.log(postTitle);
    console.log(postDate);
    console.log(postSummary);

    if(postTitle == "" || postDate == "" || postSummary == "") {
        alert("User has not entered all required information");
        postDialog.close();
    }
    //save values
    postCount++;
    let postItem = document.createElement('li');
    postItem.id = "post" + postCount;

    let entry = {
        id: postItem.id,
        title: postTitle,
        date: postDate,
        summary: postSummary,
    }
    console.log(entry);
    posts.push(entry);

    //display values

    let postInfo = document.createElement('p');
    let template = `Title: ${postTitle} Date: ${postDate} Summary: ${postSummary}`
    postInfo.textContent = template;

    console.log(postInfo.textContent)
    postItem.appendChild(postInfo);

    let editBtn = document.createElement('button');
    editBtn.id = "editUser" + postCount;
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editPost);
    postItem.appendChild(editBtn);

    let delBtn = document.createElement('button');
    delBtn.id = "delUser" + postCount;
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", delPost);
    postItem.appendChild(delBtn);

    document.getElementById("postList").appendChild(postItem);

    localStorage.setItem(postItem.id, template);
    
    //close dialog box
    alert("post added");
    postDialog.close();

}

function saveExistingPost(postId) {

    editPostDialog.close();
    alert("Post edited");
    let currPostIndex = posts.findIndex(x => x.id === postId);

    posts[currPostIndex].title = document.getElementById('editTitle').value;
    posts[currPostIndex].date = document.getElementById('editDate').value;
    posts[currPostIndex].summary = document.getElementById('editSummary').value;

    let template = `Title: ${posts[currPostIndex].title} Date: ${posts[currPostIndex].date} Summary: ${posts[currPostIndex].summary}`
    let text = document.getElementById(postId);
    text.firstChild.textContent=template;
}

function editPost() {
    postId = this.parentNode.id;

    let currPost = posts.find(x => x.id === postId)

    document.getElementById('editTitle').value = currPost.title;
    document.getElementById('editDate').value = currPost.date;
    document.getElementById('editSummary').value = currPost.summary;

    let postDialog = document.getElementById("editPostDialog");
    editPostDialog.showModal();

    let saveButton = document.getElementById("editSaveBtn");
    let cancelButton = document.getElementById("editCancelBtn");
    cancelButton.onclick = function() {cancelEditPost()};
    saveButton.onclick = function() {saveExistingPost(postId)};

    
}

function delPost() {
    //id of list item
    postId = this.parentNode;

    //remove Event Listener for delete button
    this.removeEventListener("click", delPost);
    //remove Event Listener for edit button
    this.previousSibling.removeEventListener("click", editPost);
    //list item
    this.parentNode.parentNode.removeChild(postId);
    window.localStorage.removeItem(this.parentNode.id);
}