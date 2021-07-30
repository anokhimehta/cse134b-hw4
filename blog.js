window.addEventListener("DOMContentLoaded", init);

let postCount = 0;
let posts = [];

function init() {
    document.getElementById("newPostBtn").addEventListener("click", newPost);
    document.getElementById("saveBtn").addEventListener("click", savePost);
    document.getElementById("cancelBtn").addEventListener("click", cancelPost);

    posts = [
        {   
            "id" : "post2",
            "title": "Post2",
            "date": "07/25/21",
            "summary": "Today I worked on my assignment for my CSE 134 class"
        },
        {
            "id" : "post1",
            "title": "Post1",
            "date": "07/23/21",
            "summary": "My EDS 124BR Class is very interesting, we are learning about computational thinking."
        },  
    ]

    localStorage.setItem(posts[0].id, JSON.stringify(posts[0]));
    localStorage.setItem(posts[1].id, JSON.stringify(posts[1]));
    // localStorage.setItem("post1", `Title: ${posts[0].title} Date: ${posts[0].date} Summary: ${posts[0].summary}`);
    // localStorage.setItem("post2", `Title: ${posts[1].title} Date: ${posts[1].date} Summary: ${posts[1].summary}`);

    displayLocalPosts();

}

function displayPost(post) {
    console.log(post)
    postCount++;
    let postItem = document.createElement('li');
    postItem.id = post[0];
    console.log(post[1]);
    let postInfo = JSON.parse(post[1]);
    console.log(postInfo.title);

    let postTitle = document.createElement('p');
    postTitle.className = "titles";
    postTitle.textContent = postInfo.title;

    let postDate = document.createElement('p');
    postDate.className = "dates"
    postDate.textContent = postInfo.date;

    let postSummary = document.createElement('p');
    postSummary.className = "summaries"
    postSummary.textContent = postInfo.summary;

    postItem.appendChild(postTitle);
    postItem.appendChild(postDate);
    postItem.appendChild(postSummary);

    let editBtn = document.createElement('button');
    editBtn.id = "editUser" + postCount;
    editBtn.addEventListener("click", editPost);
    postItem.appendChild(editBtn);

    let delBtn = document.createElement('button');
    delBtn.id = "delUser" + postCount;
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
}

function cancelEditPost() {
    let postDialog = document.getElementById("editPostDialog");
    editPostDialog.close();
}

function savePost() {

    
    //read values
    let newDialog = document.getElementById("addPostDialog");
    let newTitle = document.getElementById("title").value;
    let newDate = document.getElementById("date").value;
    let newSummary = document.getElementById("summary").value;

    //TODO: Need to DOMPurify
    newTitle = DOMPurify.sanitize(newTitle);
    newDate = DOMPurify.sanitize(newDate);
    newSummary = DOMPurify.sanitize(newSummary);

    if(newTitle == "" || newDate == "" || newSummary == "") {
        alert("User has not entered all required information");
        postDialog.close();
    }
    //save values
    postCount++;
    let postItem = document.createElement('li');
    postItem.id = "post" + postCount;

    let entry = {
        "id": postItem.id,
        "title": newTitle,
        "date": newDate,
        "summary": newSummary,
    }
    posts.push(entry);

    //display values

    let postTitle = document.createElement('p');
    postTitle.className = "titles";
    postTitle.textContent = newTitle;

    let postDate = document.createElement('p');
    postDate.className = "dates"
    postDate.textContent = newDate;

    let postSummary = document.createElement('p');
    postSummary.className = "summaries"
    postSummary.textContent = newSummary;

    postItem.appendChild(postTitle);
    postItem.appendChild(postDate);
    postItem.appendChild(postSummary);

    let editBtn = document.createElement('button');
    editBtn.id = "editUser" + postCount;
    editBtn.textContent = "Edit";
    editBtn.className = "fa fa-"
    editBtn.addEventListener("click", editPost);
    postItem.appendChild(editBtn);

    let delBtn = document.createElement('button');
    delBtn.id = "delUser" + postCount;
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", delPost);
    postItem.appendChild(delBtn);

    document.getElementById("postList").appendChild(postItem);
    console.log(JSON.stringify(entry));

    localStorage.setItem(postItem.id, JSON.stringify(entry));
    
    //close dialog box
    newDialog.close();

}

function saveExistingPost(postId) {

    editPostDialog.close();
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
    console.log(postId);
    console.log(posts);
    let currPost = posts.find(x => x.id === postId)
    console.log(currPost)

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
    console.log(this.parentNode.id);
    window.localStorage.removeItem(this.parentNode.id);
}