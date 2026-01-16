function initToolbar(toolbar) {
    // Har button ke click par command execute karo
    toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            let editor = btn.closest('.editor_box').querySelector('.editor');
            editor.focus();
            document.execCommand(btn.dataset.command);
            updateToolbarState(editor, toolbar);
        });
    });

    // Typing ya text select karne par button active/deactive
    let editor = toolbar.closest('.editor_box').querySelector('.editor');
    editor.addEventListener('keyup', () => updateToolbarState(editor, toolbar));
    editor.addEventListener('mouseup', () => updateToolbarState(editor, toolbar));
}

function updateToolbarState(editor, toolbar) {
    toolbar.querySelectorAll('.toolbar-btn').forEach(button => {
        let command = button.dataset.command;
        if (document.queryCommandState(command)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Page load ke baad pehle block ka toolbar bind karo
document.querySelectorAll('.toolbar').forEach(toolbar => initToolbar(toolbar));



function cvform() {
    document.getElementById("cv_full_name").innerHTML = document.getElementById("full_name").value;
    document.getElementById("cv_location").innerHTML = document.getElementById("location").value;;
    document.getElementById("cv_address").innerHTML = document.getElementById("address").value;;
    document.getElementById("cv_phone_no").innerHTML = document.getElementById("phone_no").value;;
    document.getElementById("cv_email").innerHTML = document.getElementById("email").value;;

    document.getElementById("cv_summary_section").innerHTML = document.getElementById("summary_section").value;

    document.getElementById("cv_degree").innerHTML = document.getElementById("degree").value;
    document.getElementById("cv_city").innerHTML = document.getElementById("city").value;
    document.getElementById("cv_obtain_mark").innerHTML = document.getElementById("obtain_mark").value;

    document.getElementById("cv_skill_name").innerHTML = document.getElementById("skill_name").value;

    let categoryInput = document.getElementById("category").value;
    let categoryList = categoryInput.split(",").map(item => item.trim());
    let cvCategoryUl = document.getElementById("cv_category");

    cvCategoryUl.innerHTML = "";

    categoryList.forEach(skill => {
        let li = document.createElement("li");
        li.textContent = skill;
        cvCategoryUl.appendChild(li);
    });


    let expSection = document.getElementById("cv_experience_section");
    expSection.innerHTML = "";

    let blocks = document.querySelectorAll(".experience_block");

    blocks.forEach(b => {
        let jobInput = b.querySelector(".job_title");
        let cityInput = b.querySelector(".city_state");
        let description = b.querySelector(".editor").innerHTML;


        let startInput =
            b.querySelector(".start_start_1") ||
            b.querySelector("#start_start_1");

        let endInput =
            b.querySelector(".end_end_1") ||
            b.querySelector("#end_end_1");

        let currentCheckbox =
            b.querySelector(".current_checkbox") ||
            b.querySelector("#current_1");

        let job = jobInput ? jobInput.value : "";
        let cityState = cityInput ? cityInput.value : "";

        let startDate = startInput ? formatMonth(startInput.value) : "";
        let endDate = "";
        if (currentCheckbox && currentCheckbox.checked) {
            endDate = "Current";
        } else if (endInput) {
            endDate = formatMonth(endInput.value);
        }




        let dateText = (startDate || endDate) ? `${startDate} – ${endDate}` : "";

        if (job !== "") {
            document.getElementById("cv_experience_section").innerHTML += `
            <h4>${job}</h4>
            <span>${cityState}</span>
            <span class="date_rigth">${dateText}</span>
            <p>${description}</p>
        `;
        }
    });
  if (checkAllEditors()) {
        cvform(); // agar sab editors filled ho to CV update karo
    }

}


function addexp() {
    let count = document.querySelectorAll(".experience_block").length + 1;
    let container = document.getElementById("main_container");
    let block = document.createElement("div");
    block.className = "experience_block";

    block.innerHTML = `
        <div class="form_group">
            <label class="job_title_label">Job Title ${count}:</label>
            <input type="text" placeholder="Enter Your Experience" class="job_title">
        </div>
        <div class="form_group">
            <label>City , State:</label>
            <input type="text" placeholder="City , State" class="city_state">
        </div>
        <div class="group_2">
            <label>Start & End Dates:</label><br>
            
            <div class="current_container" style="display:none; margin-top:5px;">
                <input type="checkbox" class="current_checkbox" style="width: 5%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;">
                <label>Current Employ</label>
            </div>
            <input type="month" placeholder="Start" class="start_start_1">
            <input type="month" placeholder="End" class="end_end_1">

        </div>

        <div class="form_group">
            <label>Description:</label>
            <div class="editor_box">
                <div class="toolbar">
    <button type="button" class="toolbar-btn" data-command="bold">
        <i class="fa-solid fa-bold"></i>
    </button>
    <button type="button" class="toolbar-btn" data-command="insertUnorderedList">
        <i class="fa-solid fa-list-ul"></i>
    </button>
    <button type="button" class="toolbar-btn" data-command="insertOrderedList">
        <i class="fa-solid fa-list-ol"></i>
    </button>
</div>

                <div class="editor" contenteditable="true"></div>
                                                <span class="error-text" style="display:none;">Please fill description first</span>

            </div>
        </div>

        <!-- Delete Button -->
        <button type="button" class="delete_exp" style="margin-top:10px; background:red; color:white; border-radius: 4px; border:none; padding:5px 10px; cursor:pointer;">
            Delete Experience
        </button>
    `;

    container.appendChild(block);

    let toolbar = block.querySelector('.toolbar');
    initToolbar(toolbar);


    block.querySelector('.delete_exp').addEventListener('click', function () {
        container.removeChild(block);
        updateJobTitleNumbers();

        block.querySelectorAll('.toolbar button').forEach(btn => {
            btn.addEventListener('click', () => {
                let editor = btn.closest('.editor_box').querySelector('.editor');
                editor.focus();

                let command = btn.getAttribute('onclick').match(/'(.*)'/)[1];

                document.execCommand(command);

                let toolbar = btn.closest('.toolbar');
                toolbar.querySelectorAll('button').forEach(button => {
                    let cmd = button.getAttribute('onclick').match(/'(.*)'/)[1];
                    if (document.queryCommandState(cmd)) {
                        button.classList.add('active');
                    } else {
                        button.classList.remove('active');
                    }
                });
            });
        });

    });

    const startInput = block.querySelector('.start_start_1');
    const endInput = block.querySelector('.end_end_1');
    const currentContainer = block.querySelector('.current_container');
    const currentCheckbox = block.querySelector('.current_checkbox');

    startInput.addEventListener('input', () => {
        if (startInput.value) {
            currentContainer.style.display = 'block';
            endInput.min = startInput.value;
            startInput.setCustomValidity('');
        } else {
            currentContainer.style.display = 'none';
            currentCheckbox.checked = false;
            endInput.style.display = 'inline-block';
            endInput.min = '';
        }
    });

    endInput.addEventListener('input', () => {
        if (startInput.value && endInput.value < startInput.value) {
            endInput.setCustomValidity('End date cannot be before start date');
        } else {
            endInput.setCustomValidity('');
        }
    });

    currentCheckbox.addEventListener('change', () => {
        if (currentCheckbox.checked) {
            endInput.style.display = 'none';
            endInput.value = '';
            endInput.required = false;
            endInput.disabled = true;
        } else {
            endInput.style.display = 'inline-block';
            endInput.disabled = false;
            endInput.required = true;
        }
    });

    startInput.addEventListener('input', () => {
        if (startInput.value) {
            currentContainer.style.display = 'block';
        } else {
            currentContainer.style.display = 'none';
            currentCheckbox.checked = false;
            endInput.style.display = 'inline-block';
        }
    });

    currentCheckbox.addEventListener('change', () => {
        if (currentCheckbox.checked) {
            endInput.style.display = 'none';
            endInput.value = '';
            endInput.required = false;
            endInput.disabled = true;
        } else {
            endInput.style.display = 'inline-block';
            endInput.disabled = false;
            endInput.required = true;
        }
    });
    updateJobTitleNumbers();
}

function checkAllEditors() {
    let allValid = true;

    // Sare editors loop karo
    document.querySelectorAll('.editor_box').forEach(box => {
        let editor = box.querySelector('.editor');
        let errorText = box.querySelector('.error-text');

        if (editor && editor.innerText.trim() === "") {
            if (errorText) errorText.style.display = 'block'; // only if errorText exists
            editor.focus();
            allValid = false;
        } else {
            if (errorText) errorText.style.display = 'none'; // only if errorText exists
        }
    });

    return allValid; // true agar sab filled hai, false agar koi empty
}

// form submit ke liye
// document.getElementById("cvForm").addEventListener("submit", function (e) {
//     e.preventDefault(); // page reload na ho
//     if (checkAllEditors()) {
//         cvform(); // agar sab editors filled ho to CV update karo
//     }
// });

// Har editor me typing par error hide kar do
document.addEventListener('input', function (e) {
    if (e.target.classList.contains('editor')) {
        let box = e.target.closest('.editor_box');
        let errorText = box.querySelector('.error-text');
        if (e.target.innerText.trim() !== "") {
            errorText.style.display = 'none';
        }
    }
});




function updateJobTitleNumbers() {
    document.querySelectorAll(".experience_block").forEach((block, index) => {
        let label = block.querySelector(".job_title_label");
        if (label) {
            label.innerText = `Job Title ${index + 1}:`;
        }
    });
}



function format(btn, command) {
    let editor = btn.closest('.editor_box').querySelector('.editor');
    editor.focus();
    document.execCommand(command);
}



const startInput = document.getElementById('start_start_1');
const endInput = document.getElementById('end_end_1');
const currentContainer = document.getElementById('currentContainer_1');
const currentCheckbox = document.getElementById('current_1');

startInput.addEventListener('input', () => {
    if (startInput.value) {
        currentContainer.style.display = 'block';
        endInput.min = startInput.value;
        startInput.setCustomValidity('');
    } else {
        currentContainer.style.display = 'none';
        currentCheckbox.checked = false;
        endInput.style.display = 'inline-block';
        endInput.min = '';
    }
});

endInput.addEventListener('input', () => {
    if (startInput.value && endInput.value < startInput.value) {
        endInput.setCustomValidity('End date cannot be before start date');
    } else {
        endInput.setCustomValidity('');
    }
});


startInput.addEventListener('input', () => {
    if (startInput.value) {
        currentContainer.style.display = 'block';
    } else {
        currentContainer.style.display = 'none';
        currentCheckbox.checked = false;
        endInput.style.display = 'inline-block';
    }
});

currentCheckbox.addEventListener('change', () => {
    if (currentCheckbox.checked) {
        endInput.style.display = 'none';
        endInput.value = '';
    } else {
        endInput.style.display = 'inline-block';
    }
});

const eduStart = document.getElementById("start_start_2");
const eduEnd = document.getElementById("end_end_2");
const cvEduDates = document.getElementById("cv_dates_2");

eduStart.addEventListener('input', () => {
    eduEnd.min = eduStart.value;
    eduStart.setCustomValidity('');
});

eduEnd.addEventListener('input', () => {
    if (eduStart.value && eduEnd.value < eduStart.value) {
        eduEnd.setCustomValidity('End date cannot be before start date');
    } else {
        eduEnd.setCustomValidity('');
    }
});


const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function formatMonth(value) {
    if (!value) return "";
    const parts = value.split("-");
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const monthName = monthNames[monthIndex] || "";
    return `${monthName} ${year}`;
}

function updateEduDates() {
    let start = formatMonth(eduStart.value) || "Start";
    let end = formatMonth(eduEnd.value) || "End";
    cvEduDates.textContent = `${start} | ${end}`;
}

function isEditorEmpty(editor) {
    return editor.textContent.trim() === "" && editor.innerHTML.trim() === "";
}


eduStart.addEventListener('input', updateEduDates);
eduEnd.addEventListener('input', updateEduDates);


document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let editor = btn.closest('.editor_box').querySelector('.editor');
        editor.focus();

        document.execCommand(btn.dataset.command);

        updateToolbarState(editor, btn.closest('.toolbar'));
    });
});



document.querySelectorAll('.editor').forEach(editor => {
    editor.addEventListener('keyup', () => {
        let toolbar = editor.closest('.editor_box').querySelector('.toolbar');
        updateToolbarState(editor, toolbar);
    });
    editor.addEventListener('mouseup', () => {
        let toolbar = editor.closest('.editor_box').querySelector('.toolbar');
        updateToolbarState(editor, toolbar);
    });
});


document.querySelectorAll('.toolbar').forEach(toolbar => {
    initToolbar(toolbar);
});

document.getElementById("cvForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stops the page from reloading
    cvform();           // updates the CV preview
});