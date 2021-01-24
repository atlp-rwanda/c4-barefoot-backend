const htmlEmail = (emailText) => {
return (`<html lang="en">
<head>
	<link rel="stylesheet" href="">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Email Template</title>
	<style>
		body {
    margin: 0;
    padding: 0;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: steelblue;
    color: white;
    
}
.brand-title {
    font-size: 1.5rem;
    margin: .5rem;

}
.content{
    margin: 80px;
    padding: 80px;
}
footer{
	margin: 100px;
}
@media ( max-width:400px ) {
	
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: steelblue;
    color: white;
    
}
.brand-title {
    font-size: 1.5rem;
    margin: .5rem;

}
.content{
    margin: 20px;
    padding: 20px;
}
footer{
	margin: 20px;
}
	
}
@media ( max-width:1024px ) {
	
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: steelblue;
		color: white;
		
	}
	.brand-title {
		font-size: 1.5rem;
		margin: .5rem;
	
	}
	.content{
		width: 70%;
		height: 70%;
		margin: 20px;
		padding: 20px;
		
	}
	footer{
		margin:100px;
}	
	}
	</style>
</head>
<body>
	<nav class="navbar" >
		<div class="brand-title">Barefoot nomad</div>
	</nav>
	
	<div class="content">
		
		<h3>Barefoot nomad</h3>
		
		${emailText}
		
	</div>
	<footer>
		<a href="">from @Barefootnomad.com</a>
	</footer>
</body>
</html>`);
}
export default  htmlEmail;
	