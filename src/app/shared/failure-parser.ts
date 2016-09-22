import { Response  } from '@angular/http';
import { API_ENDPOINT } from '../shared/global-constants';


export class FailureParser 
{

  /**
   * Parse failure response.
   * 
   * @param Response
   * @return Failure message
   */
  public static parseFailureResponse(response:Response):string
  {
    console.log(":: ProductService.parseFailureResponse");
    let failureMsg:string = "";

    switch(response.status)
    {
      case 404:
      case 400:
        failureMsg = response.json().message;
        break;

      case 500:
        failureMsg = "Internal Server Error (status 500)";
        break;

      case 0:
        failureMsg = "Can't connect to API endpoint: " + API_ENDPOINT;
        console.error(response);
        break;

      default:
        failureMsg = "Unknow response status: " + response.status;
        console.error(response);
    }
    return failureMsg;
  }

}
