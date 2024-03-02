export default function formValidation(event) {
  var { name, value } = event.target;
  switch (name) {
    case "name":
    case "username":
    case "subject":
    case "profession":
    case "color":
      if (value.length === 0) return name + " field must required";
      else if (value.length < 3 || value.length > 50)
        return (
          name +
          " field must contains atleast 3 character and must be less then 50 characters"
        );
      else return "";

    case "star":
      if (!value) return name + " field must required";
      else if (value < 1) return "Rating Must Greater Then 0";
      else return "";
    case "size":
      if (value.length === 0) return name + " field must required";
      else if (value.length > 10)
        return name + " field must  less then 10 characters";
      else return "";
    case "message":
      if (value.length === 0) return name + " field must required";
      else if (value.length == 20)
        return name + " field must contain 20 characters";
      else return "";
    case "baseprice":
      if (!value) return name + " field must required";
      else if (value < 1) return "Base Price Must Greater then 0";
      else return "";
    case "discount":
      if (!value) return name + " field must required";
      else if (value < 0 && value > 100)
        return "Discount Must Greater then 0 and less then 100";
      else return "";

    case "email":
      if (value.length === 0) return name + "field must required";
      else if (value.length <= 13 && value.length >= 50)
        return "Enter a Valid" + name + "address";
      else return "";

    case "password":
      if (value.length === 0) return name + "field must required";
      else if (value.length <= 8 && value.length >= 50)
        return name + " field must contains atleast 8 character or more";
      else return "";
    case "phone":
      if (value.length === 0) return name + "field must required ";
      else if (value.length !== 10) return "Enter a valid" + name + "number";
      else if (value[0] <= 0 && value[0] >= 9) return "Invalid Phone Number";
      else return "";
    default:
      return "";
  }
}
