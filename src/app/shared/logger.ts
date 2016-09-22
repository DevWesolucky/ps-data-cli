import { AppConfig } from './app-config';

export var appLogLevel:number = 2;

export class Logger 
{
    public static log(msg:string, logLevel:number = 2):void
    {
        if (!AppConfig.logEnabled || logLevel < appLogLevel) return;
        console.log(msg);
    }

    public static debug(msg:string):void
    {
        if (!AppConfig.debugEnabled) return;
        console.log(msg);
    }

    public static debugArrayObjByIndex(arr:Array<Object>, index:number = 0):void
    {
        if (!AppConfig.logEnabled) return;
        console.log("------- array length: " + arr.length);
        if (arr.length > index - 1) console.log(arr[index]);
    }
    
}
