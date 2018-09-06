import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'convertToSpaces'
})

export class ConvertToSPacesPipe implements PipeTransform{
    transform(value: string, character: string) {
        return value.replace(character, ' ');
    }
   

}