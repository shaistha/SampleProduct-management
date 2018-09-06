import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { Productservice } from './product.service';


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})


export class ProductListComponent implements OnInit{
   
    pageTitle : string = "Product List!"
    ImageWidth : number = 50;
    ImageMargin : number = 2;
    showImage : boolean = false;
    filterProducts: IProduct[];
    products : IProduct[] = [];
    errorMessage : string;

    _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    constructor(private productService : Productservice){
    }

    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log("ngOninit control");
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filterProducts = this.products;
            },
            error => this.errorMessage = <any>(error)
        );
    }

    performFilter(filterBy : string) : IProduct[]{
         filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product : IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    OnRatingEventClicked(message: string) : void{
        this.pageTitle ="Product List " + message;
    }
}