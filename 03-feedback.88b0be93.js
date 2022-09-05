const e=document.querySelector(".feedback-form"),t={};e.addEventListener("input",(function(e){const{name:o,value:n}=e.target;t[o]=n;const c=JSON.stringify(t);console.log(c),localStorage.setItem("formKey",c)}));
//# sourceMappingURL=03-feedback.88b0be93.js.map
