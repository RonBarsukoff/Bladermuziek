﻿namespace Data {
    async function laadJsonObject(aUrl: string): Promise<any> {
        let myFile = await fetch(aUrl);
        let myContent = await myFile.text();
        return JSON.parse(myContent);
    }

    export async function laadLijst(aFilter: LijstFilter): Promise<any> {
        let myUrl = constBasisUrl + '/?pagina=stuklijst';
        if (aFilter.album != '')
            myUrl = myUrl + '&album=' + aFilter.album;
        if (aFilter.auteur != '')
            myUrl = myUrl + '&auteur=' + aFilter.auteur;
        myUrl += '&sortorder=titel';
        let myJsonObject = await laadJsonObject(myUrl);
        return myJsonObject;
    }
/* offline versie
    export async function laadLijst(aFilter: LijstFilter): Promise<any> {
        let myUrl = 'data/stuklijst.json'; 
        let myJsonObject = await laadJsonObject(myUrl);
        return myJsonObject;
    }
*/
    export async function laadAlbums(): Promise<any> {
        return await laadJsonObject(constBasisUrl + '/?pagina=albumlijst');
    }

    export async function laadAuteurs(): Promise<any> {
        return await laadJsonObject(constBasisUrl + '/?pagina=auteurlijst');
    }

    export async function laadStuk(aStukId: number): Promise<any> {
        let myFile = await fetch(constBasisUrl + '/?pagina=paginas&stukid=' + aStukId.toString());
        let myContent = await myFile.text();
        return JSON.parse(myContent);
    }

    export async function getVolgendStukIdUitAlbum(aStukId: number, aVorig: boolean): Promise<number> {
        let myUrl = constBasisUrl + '/?pagina=getVolgendeStuk&StukId=' + aStukId.toString();
        if (aVorig)
            myUrl = myUrl + '&Vorige=J';
        let myFile = await fetch(myUrl);
        let myContent = await myFile.text();
        let myObject = JSON.parse(myContent);
        return myObject.stukId;
    }

    export function getImageUrl(aStukId: number, aPaginaNr: number): string {
        return `${constBasisUrl}/?pagina=pagina&stukId=${aStukId}&paginaNr=${aPaginaNr}`;
    }

    type LijstFilter = { auteur: string, album: string }
}