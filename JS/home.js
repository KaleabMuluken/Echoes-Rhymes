const observer= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }

    });
});

const hiddenElements=document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
let cards = document.querySelectorAll(".card");
let stackArea= document.querySelector(".stack-area");
function rotateCards() {
let angle = 0;
cards.forEach((card) => {
    if(card.classList.contains("active")){
        card.style.transform=`translate(-50%,-120vh) rotate(-48deg)`;
    }else{ 
card.style.transform = `translate(-50%,-50%) rotate(${angle}deg)`
angle=angle -10;
 }
});
}
rotateCards();
window.addEventListener("scroll",() =>{
    let proportion = stackArea.getBoundingClientRect().top/window.innerHeight;
    if(proportion <= 0){
        let n= cards.length;
        let index= Math.ceil((proportion * n)/2);
        index=Math.abs(index)-1;
        for(let i=0;i<n;i++){
            if(i<= index){
                cards[i].classList.add("active");
            }
            else{
                cards[i].classList.remove("active");
            }
        }
        rotateCards();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const contentCards = document.querySelectorAll(".content-card");

    searchBar.addEventListener("input", function () {
        const searchQuery = searchBar.value.toLowerCase();

        contentCards.forEach(card => {
            const title = card.querySelector(".content-title").textContent.toLowerCase();
            const author = card.querySelector(".content-author").textContent.toLowerCase();
            const snippet = card.querySelector(".content-snippet").textContent.toLowerCase();

            if (title.includes(searchQuery) || author.includes(searchQuery) || snippet.includes(searchQuery)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});
//nav2
document.addEventListener('DOMContentLoaded', function () {
    const categoryTabs = document.querySelectorAll('.category-tab'); // Select category links
    const allCards = document.querySelectorAll('.content-card'); // Select all content cards

    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault(); 

            const category = this.dataset.category;

            // Loop 
            allCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none'; 
                }
            });

            
            categoryTabs.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
// Function to filter 
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        
        
        const category = this.getAttribute('data-category');
        
       
        const sections = document.querySelectorAll('.featured-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        
        const selectedSection = document.querySelector(`.${category}`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
    });
});
//read more
function toggleContent(button) {
    
    const fullContent = button.nextElementSibling;

    
    if (fullContent.style.display === "none") {
      fullContent.style.display = "block"; 
      button.textContent = "Read Less";
    } else {
      fullContent.style.display = "none"; 
      button.textContent = "Read More"; 
    }
  }

document.getElementById('submit-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value;

    if (!title || !author || !category || !content) {
        showMessage('All fields except Tags are required.', 'error');
        return;
    }

    document.getElementById('submit-form').reset();

    showMessage('Your work has been submitted successfully!', 'success');
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';

    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 5000);
}
