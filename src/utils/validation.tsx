export const EMAIL_VALIDATION={
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email not valid"
                  }
                }

                export const USERNAME_VALIDATION={
                required:"userName is Required",
                maxLength:{
                    value:8,
                    message:"UserName must not exceed 8 characters"
                       },
                        pattern:{
                          value: /^[A-Za-z]+[0-9]+$/, 
                         message: "UserName must contain letters and end with numbers (no spaces)"
                           }
              }

                              export const PASSWORD_VALIDATION={
                required:"Password is Required",

              }