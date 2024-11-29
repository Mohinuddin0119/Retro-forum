const loadData = async() =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    const data = await res.json()
    const allPost = await data.posts
    console.log(allPost)
    allPost.forEach((post) =>{
        console.log(post)
        const allPostContainer = document.getElementById('discussContainer1')
        const div = document.createElement('div')
        div.classList = "flex flex-col md:flex-row justify-between gap-5"
        div.innerHTML = `
        <div id="discussCardContainer" class="flex-1  flex flex-col md:flex-row justify-between gap-10 my-5 p-10 rounded-3xl bg-gray-200  hover:bg-[#797DFC1A] hover:border-2 hover:border-[#797DFC1A]">
            <div class='max-w-96'>
              <img class="w-52 rounded-lg" src="${post?.image}" alt="">
            </div>
            <div>
              <div class="flex flex-col md:flex-row items-center gap-5 text-black my-2">
                <p>#${post?.category}</p>
                <p class='font-bold'>Author: ${post?.author?.name}</p>
              </div>
              <h3 class="text-black text-xl font-bold my-2">${post?.title}</h3>
              <p>${post?.description}</p>
              <p class="border-dashed border my-5"></p>
              <div class=" flex flex-col md:flex-row justify-between items-center gap-5" >
                <div class="flex flex-col md:flex-row justify-between items-center">
                  <div class="flex items-center justify-between gap-2">
                    <img class=" ml-3" src="./images/message-2.svg" alt="">${post?.comment_count}
                  </div>
                  <div class="flex items-center justify-between gap-2">
                    <img class=" ml-3" src="./images/tabler-icon-eye.svg" alt="">${post?.view_count}
                  </div>
                  <div class="flex items-center justify-between gap-2">
                    <img class=" ml-3" src="./images/Group 18.svg" alt="">${post?.posted_time} min
                  </div>
                </div>
                <div class="">
                  <img class="" src="./images/email 1.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        `
        allPostContainer.appendChild(div)
    })
}

loadData();