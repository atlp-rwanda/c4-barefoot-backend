const htmlEmail = (content) => {
return (`<html>
<title>Template</title>
<style>
	/* -------------------------------------
    GLOBAL
------------------------------------- */
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  font-size: 14px;
}

img {
  max-width: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: none;
  width: 100% !important;
  height: 100%;
  line-height: 1.6;
}

/* Lets make sure all tables have defaults */
table td {
  vertical-align: top;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
body {
  background-color: #f6f6f6;
}

.body-wrap {
  background-color: #f6f6f6;
  width: 100%;
}

.container {
  display: block !important;
  max-width: 600px !important;
  margin: 0 auto !important;
  /* makes it centered */
  clear: both !important;
}

.content {
  max-width: 600px;
  margin: 0 auto;
  display: block;
  padding: 20px;
}

/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
  background: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 3px;
}

.content-wrap {
  padding: 0px;
}

.content-block {
  padding: 0 0 20px;
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.footer {
  width: 100%;
  clear: both;
  color: #999;
  padding: 20px;
}
.footer a {
  color: #999;
}
.footer p, .footer a, .footer unsubscribe, .footer td {
  font-size: 12px;
}


/* -------------------------------------
    TYPOGRAPHY
------------------------------------- */
h1, h2, h3 {
  font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  color: #000;
  margin: 40px 0 0;
  line-height: 1.2;
  font-weight: 400;
}

h1 {
  font-size: 32px;
  font-weight: 500;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 14px;
  font-weight: 600;
}

p, ul, ol {
  margin-bottom: 10px;
  font-weight: normal;
}
p li, ul li, ol li {
  margin-left: 5px;
  list-style-position: inside;
}

/* -------------------------------------
    LINKS & BUTTONS
------------------------------------- */
a {
  color: #348eda;
  text-decoration: underline;
}

.btn-primary {
  text-decoration: none;
  color: #FFF;
  background-color: #348eda;
  border: solid #348eda;
  border-width: 10px 20px;
  line-height: 2;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
  text-transform: capitalize;
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */

.aligncenter {
  text-align: center;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 640px) {
  h1, h2, h3, h4 {
    font-weight: 600 !important;
    margin: 20px 0 5px !important;
  }

  h1 {
    font-size: 22px !important;
  }

  h2 {
    font-size: 18px !important;
  }

  h3 {
    font-size: 16px !important;
  }

  .container {
    width: 100% !important;
  }

  .content, .content-wrapper {
    padding: 10px !important;
  }

  .invoice {
    width: 100% !important;
  }
}


</style>
<!-- <style>
	.body-wrap{
		padding: 10rem;
		align-content: center;
	}
	.title{
		padding: 10px;
		background-color:#257AAA ;
		color: white;
		margin-top: -20px;
		font-size: 30px;
		}

	
</style> -->

</head>

<body data-new-gr-c-s-check-loaded="14.992.0" data-gr-ext-installed="">

<table class="body-wrap">
	<tbody><tr>
		<td></td>
		<td class="container" width="600">
			<div class="content">
				<table class="main" width="100%" cellpadding="0" cellspacing="0">
					<tbody><tr>
						
						<td class="content-wrap">
							<table width="100%" style="margin-bottom: 30px" cellpadding="0" cellspacing="0">
								<tbody>
                  <tr style="background-color: #348eda;">
                    <td class="title" style="padding: 20px; font-weight: bold;">
                      Barefoot Nomad.
                    </td>
                </tr>
                </tbody>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tbody>
								<tr>
									<td style="padding: 20px;" class="content-block">
                    Hi ${content.name},
                    <br>
                    ${content.body}
									</td>
								</tr>

								<tr>
									<td style="padding: 20px;" class="content-block">
									
									</td>
								</tr>
								<tr>
									<td style="padding: 0px 20px 20px 20px;" class="content-block">
										<img src="https://res.cloudinary.com/dk0bik4yw/image/upload/v1611676157/Barefoot_hu20hz.png" alt="HTML5 Icon" style="width:40px;height:40px;">
									</td>
								</tr>
								
					
							</tbody></table>
						</td>
					</tr>
				</tbody></table></div>
		</td>
		<td></td>
	</tr>
</tbody></table>



</body></html>`);
	}
export default  htmlEmail;
	
{/* <p> Hi ${content.name} </br> ${content.body}</p> */}
// `);