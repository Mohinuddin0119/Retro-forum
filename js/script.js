const loadData = async (query) => {
  const spinner = document.getElementById('spinner')
  spinner.classList.remove('hidden')
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${query}`
  );
  const data = await res.json();
  const allPost = data.posts;
  // spinner
  const notFoundId = document.getElementById('not-found')
  if(allPost.length > 0){
    spinner.classList.add('hidden')
    notFoundId.classList.add('hidden')
  }

  if(!allPost.length){
    spinner.classList.add('hidden')
    notFoundId.classList.remove('hidden')
  }

  const allPostContainer = document.getElementById("discussContainer1");
  allPostContainer.innerHTML = ''
  allPost.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.classList = "flex flex-col md:flex-row justify-between gap-5";
    div.innerHTML = `
        <div onclick ="handleClick(\`${post?.title}\`,'${post?.view_count}')" id="discussCardContainer" class="flex-1  flex flex-col md:flex-row justify-between items-center gap-10 my-5 p-10 rounded-3xl bg-gray-200  hover:bg-[#797DFC1A] hover:border-2 hover:border-[#797DFC1A]">
            <div class='max-w-96 relative'>
              <div class=''>
                <div id ='red-signal' class="${post?.isActive ? 'absolute' : 'hidden' } absolute -end-1 -top-1 bg-red-600 rounded-full w-4 h-4"></div>
                <div id ='green-signal' class="${post?.isActive ? 'hidden' : 'absolute' } absolute -end-1 -top-1 bg-green-600 rounded-full w-4 h-4"></div>
              </div>
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
        `;
        allPostContainer.appendChild(div);
      });
};

const handleClick = (title,view_count) => {
  // mark signal
  const mark = document.getElementById('mark')
  mark.classList.remove('hidden')
  // count update
  let count = 0;
  let markCountId = document.getElementById('mark-read-count') 
  let countValue = markCountId.innerText
  let value = parseInt(countValue)
  value = count + value
  value++
  // console.log(value)
  markCountId.innerText = value;

  const discussTotal = document.getElementById('discussTotal')
  const div = document.createElement('div')
  div.classList = 'flex justify-between items-center py-5'
  div.innerHTML = `
  <h3 class="text-black font-bold w-52">
    ${title}
  </h3>
  <div class="flex">
    <div class="flex items-center gap-2 px-4">
      <img src="./images/tabler-icon-eye.svg" alt="" /> ${view_count}
    </div>
  </div>
  `
  discussTotal.appendChild(div)
};


// handle search
const handleSearch = () =>{
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value
  loadData(`?category=${searchText}`)
  searchField.value = ''
  // console.log(searchText)
}

// latest posts fetch
const loadLatestPosts = async() =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
  const value = await res.json();
  console.log(value);
  value.forEach((post) =>{
    console.log(post)
    const latestPostContainer = document.getElementById('latestPostContainer')
    const div = document.createElement('div');
    div.innerHTML = `
    <div class='bg-blue-100 p-5 shadow-lg rounded-3xl border'>
      <div class="">
        <img class ='rounded-xl' src="${post?.cover_image}" alt="">
      </div>
      <p class="flex gap-3 text-gray-500 my-3"><span><i class="fa-regular fa-calendar-days"></i></span>${post?.author?.posted_date ? post?.author?.posted_date : 'No date'}</p>
      <h3 class="my-3 font-bold text-xl">${post?.title}</h3>
      <p class=" text-gray-500 my-3">${post?.description}</p>
      <div class="flex items-center gap-3">
        <div>
          <img class="w-10 rounded-full" src="${post?.profile_image}" alt="">
        </div>
        <div>
          <h3 class=" font-bold ">${post?.author?.name ? post?.author?.name : 'Unknown'}</h3>
          <p class=" text-gray-500">${post?.author?.designation ? post?.author?.designation : 'Unknown'}</p>
        </div>
      </div>
    </div>
    `
    latestPostContainer.appendChild(div);
  })
}
loadLatestPosts();

loadData('');
