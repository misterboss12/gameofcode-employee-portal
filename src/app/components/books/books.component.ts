import { NotificationService } from './../../services/notification/notification.service';
import { Book } from './../../models/book.model';
import { BookService } from './../../services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  public books: Book[];
  public columns = [
    'title',
    'author',
    'publisher',
    'placeOfPublication',
    'copyrightDate',
    'numberOfCopies',
    'available',
  ];

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  private fetchBooks() {
    this.bookService.getBooks().subscribe(
      (books) => (this.books = books),
      (err) => this.notificationService.showError()
    );
  }

  deleteBook(book: Book): void {
    const deleteActionDialogConfig = new MatDialogConfig();
    deleteActionDialogConfig.disableClose = true;
    deleteActionDialogConfig.width = '600px';
    deleteActionDialogConfig.data = {
      status: '',
      action: 'delete',
      item: 'book',
    };

    const dialogActionRef = this.dialog.open(ActionDialogComponent, deleteActionDialogConfig);

    dialogActionRef.afterClosed().subscribe((status) => {
      if (status === 'yes') {
        this.books = this.books.filter((el) => el !== book);
        this.bookService.deleteBook(book).subscribe();
      }
    });
  }

  ngOnInit(): void {
    this.fetchBooks();
  }
}
