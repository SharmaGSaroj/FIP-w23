export default{
    name:'LoginPage',
    

    template:`
  
    <form @submit.prevent="login" action="/login" method="POST" class="signin-form"> 
                        
                            <label for="Email">Email</label>
                            <input v-model="email":class="{ 'error': passwordError }" type="email" name="email" id="" placeholder="example@gmail.com">
                            
                             <label for="password">Password</label>
                            <input v-model="password":class="{ 'error': emailError }" type="password"name="password" id="" placeholder="Password
                            ">
                           
                            <p class="singin-btn">
                                <input type="submit" value="SignIn">
                            </p>
            
                            <p class="signup-btn">
                                New to forum?<a href="register.html">Register</a>
                             </p>
                             <p class="policy">
                              Privacy Policy | Terms of Conditions | Ads & Cookies
                            </p>
                            
                            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

                </form>


  `,
  methods: {
    async login() {
      try {
        console.log('login method called');
        // Validate email and password inputs
        if (!this.email && !this.password) {
          this.errorMessage = 'Please enter both email and password';
          this.successMessage = '';
          this.emailError = true;
          this.passwordError = true;
          return;
        } else if (!this.validateEmail(this.email)) {
          this.errorMessage = 'Please enter a valid email';
          this.successMessage = '';
          this.emailError = true;
         
          return;
        } else if (!this.password) {
          this.errorMessage = 'Please enter your password';
          this.successMessage = '';
         
          this.passwordError = true;
          return;
        }
    
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
    
        const login = await response.json();
        if (response.ok) {
          this.successMessage = login.message;
          this.errorMessage = '';
          this.email = '';
          this.password = '';
          localStorage.setItem('email', login.email);
          window.location.href = 'forum.html';
        } else {
          this.errorMessage = login.message;
          this.successMessage = '';
        }
      } catch (error) {
        console.error(error);
      }
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }   
},
  data() {
    return {
        email: "",
        password: "",
        emailError: false,
      passwordError: false,

    }
  },
  }
