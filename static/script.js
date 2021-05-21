try{
	let inputs=document.getElementsByClassName("imp");
	let formBox=document.getElementById("formBox");
	formBox.onsubmit=(e)=>{
		if(!checkInputs()){
			e.preventDefault();
			return false;
		}
	}
	for(let i=0;i<inputs.length;i++){
		inputs[i].oninput=()=>{
			if(inputs[i].value.trim()===""){
				inputs[i].classList.add("is-invalid");
				inputs[i].classList.remove("is-valid");
				flag=false;
			}
			else{
				inputs[i].classList.add("is-valid");
				inputs[i].classList.remove("is-invalid");
			}
			if(inputs[i].id==="phnno"){
				if(inputs[i].value.length>=10){
					inputs[i].classList.add("is-valid");
					inputs[i].classList.remove("is-invalid");
					flag=false;
				}
				else{
					inputs[i].classList.add("is-invalid");
					inputs[i].classList.remove("is-valid");
				}
			}
			if(inputs[i].id==="aadhar"){
				if(inputs[i].value.length==16){
					inputs[i].classList.add("is-valid");
					inputs[i].classList.remove("is-invalid");
					flag=false;
				}
				else{
					inputs[i].classList.add("is-invalid");
					inputs[i].classList.remove("is-valid");
				}
			}
			if(inputs[i].type==="email"){
				let emailReg=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				if(emailReg.test(inputs[i].value)){
					inputs[i].classList.add("is-valid");
					inputs[i].classList.remove("is-invalid");
					flag=false
				}
				else{
					inputs[i].classList.add("is-invalid");
					inputs[i].classList.remove("is-valid");
				}
			}
		}
	}
	function checkInputs(){
		let flag=true;
		for(let i=0;i<inputs.length;i++){
			if(inputs[i].value.trim()===""){
				inputs[i].classList.add("is-invalid");
				inputs[i].classList.remove("is-valid");
				flag=false;
			}
			else{
				inputs[i].classList.add("is-valid");
				inputs[i].classList.remove("is-invalid");
			}
			if(inputs[i].id==="phnno"){
				if(inputs[i].value.length>=10){
					inputs[i].classList.add("is-valid");
					inputs[i].classList.remove("is-invalid");
				}
				else{
					inputs[i].classList.add("is-invalid");
					inputs[i].classList.remove("is-valid");
					flag=false;
				}
			}
			if(inputs[i].id==="aadhar"){
				if(inputs[i].value.length==16){
					inputs[i].classList.add("is-valid");
					inputs[i].classList.remove("is-invalid");
				}
				else{
					inputs[i].classList.add("is-invalid");
					inputs[i].classList.remove("is-valid");
					flag=false;
				}
			}
			if(inputs[i].type==="email"){
				let emailReg=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				if(emailReg.test(inputs[i].value)){
					inputs[i].classList.add("is-valid");
					inputs[i].classList.remove("is-invalid");
				}
				else{
					inputs[i].classList.add("is-invalid");
					inputs[i].classList.remove("is-valid");
					flag=false;
				}
			}
		}
		return flag;
	}
}
catch(e){}

try{
	let printBtn=document.getElementById("printBtn");
	let statusDiv=document.getElementsByClassName("status")[0];
	printBtn.onclick=()=>{
		window.print();
	}
}
catch(e){}

var jsonData;
var form=document.getElementById("formBox");

try{
	async function getData(){
		jsonData=await fetch("https://api.covid19india.org/v4/data.json");
		jsonData=await jsonData.text();
		jsonData=await JSON.parse(jsonData);
		let datalist=await document.createElement("datalist");
		datalist.id=await "states";
		let states=await Object.keys(jsonData);
		for(let i=0;i<states.length;i++){
			let option=await document.createElement("option");
			option.value=await states[i];
			await datalist.append(option);
		}
		await form.append(datalist);
		await onInputChange();
	}
	getData();
}
catch(e){}

function onInputChange(){
	try{
		let sstate=document.getElementById("sstate");
		sstate.onkeyup=()=>{
			try{
				try{
					document.getElementById("scities").remove();
				}
				catch(e){}
				let cities=jsonData[sstate.value]["districts"];
				cities=Object.keys(cities);
				let datalist=document.createElement("datalist");
				datalist.id="scities";
				for(let i=0;i<cities.length;i++){
					let option=document.createElement("option");
					option.value=cities[i];
					datalist.append(option);
				}
				form.append(datalist);
			}
			catch(e){}
		}
		let dstate=document.getElementById("dstate");
		dstate.onkeyup=()=>{
			try{
				try{
					document.getElementById("dcities").remove();
				}
				catch(e){}
				let cities=jsonData[dstate.value]["districts"];
				cities=Object.keys(cities);
				let datalist=document.createElement("datalist");
				datalist.id="dcities";
				for(let i=0;i<cities.length;i++){
					let option=document.createElement("option");
					option.value=cities[i];
					datalist.append(option);
				}
				form.append(datalist);
			}
			catch(e){}
		}
	}
	catch(e){}
}