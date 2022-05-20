import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookTicketsService} from '../../../service/booking/book-tickets.service';
import {MovieTicketToSendMailDto} from "../../../dto/MovieTicketToSendMailDto";
import {InformationTicketDTO} from "../../../dto/InformationTicketDTO";
import {Ticket} from "../../../entity/Ticket";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {element} from "protractor";
@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css']
})
export class BookingInformationComponent implements OnInit, OnDestroy{
  public infTickets: Ticket[];
  public id: number;
  public price = 0;

  constructor(
    public detailBookTicketsService: BookTicketsService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public tokenStorageService: TokenStorageService
  ) { }

  ngOnDestroy(): void {
    window.sessionStorage.clear();
  }

  ngOnInit(): void {
    let tickets = [
      {
        "ticketId": 1,
        "movieTicket": {
          "movieTicketId": 1,
          "movie": {
            "movieId": 1,
            "posterMovie": "https://www.galaxycine.vn/media/2022/3/29/1350wx9001_1648524819013.jpg",
            "movieName": "Bí mật dumbledore",
            "startDate": "2022-09-09",
            "endDate": "2022-09-09",
            "movieStudio": "phuoc",
            "actor": "Ben",
            "director": "hề hề",
            "movieLength": "123",
            "movieType": "on",
            "trailer": "abc",
            "banner": "hehe",
            "promote": true,
            "description": "Nhà khoa học",
            "deleteFlag": true,
            "movieStatus": {
              "movieStatusId": 1,
              "movieStatusName": "da chieu"
            },
            "movieCategorySet": [
              {
                "movieCategoryId": 1,
                "category": {
                  "categoryId": 1,
                  "categoryName": "Cao bồi"
                }
              }
            ],
            "ratingSet": []
          },
          "showTime": {
            "showTimeId": 1,
            "showTime": "19:00"
          },
          "showDate": "2022-09-24",
          "ticketPrice": 100000,
          "room": {
            "roomId": 1,
            "roomName": "7"
          },
          "projectionType": {
            "projectionId": 1,
            "projectionName": "3D"
          }
        },
        "user": {
          "userId": 1,
          "name": "tran van a",
          "account": {
            "username": "haha",
            "password": "123",
            "registerDate": "2022-09-09",
            "accountStatus": true,
            "point": "100",
            "verificationCode": "a",
            "isEnable": true,
            "provider": "a"
          },
          "birthday": "2022-09-09",
          "gender": 1,
          "email": "phuocrider25@gmail.com",
          "phone": "0703601484",
          "idCard": "111",
          "avatarUrl": "a",
          "ward": {
            "wardId": 1,
            "wardName": "a",
            "district": {
              "districtId": 1,
              "districtName": "a",
              "province": {
                "provinceId": 1,
                "provinceName": "a"
              }
            }
          }
        },
        "seat": {
          "seatId": 1,
          "row": {
            "rowId": 1,
            "rowName": "A"
          },
          "column": {
            "columnId": 1,
            "columnName": "1"
          },
          "seatType": {
            "seatTypeId": 1,
            "seatTypeName": "vip"
          }
        },
        "createTime": "2022-09-09",
        "ticketStatus": {
          "ticketStatusId": 1,
          "ticketStatusName": "1"
        }
      },
      {
        "ticketId": 2,
        "movieTicket": {
          "movieTicketId": 1,
          "movie": {
            "movieId": 1,
            "posterMovie": "https://www.galaxycine.vn/media/2022/3/29/1350wx9001_1648524819013.jpg",
            "movieName": "Bí mật dumbledore",
            "startDate": "2022-09-09",
            "endDate": "2022-09-09",
            "movieStudio": "phuoc",
            "actor": "Ben",
            "director": "hề hề",
            "movieLength": "123",
            "movieType": "on",
            "trailer": "abc",
            "banner": "hehe",
            "promote": true,
            "description": "Nhà khoa học",
            "deleteFlag": true,
            "movieStatus": {
              "movieStatusId": 1,
              "movieStatusName": "da chieu"
            },
            "movieCategorySet": [
              {
                "movieCategoryId": 1,
                "category": {
                  "categoryId": 1,
                  "categoryName": "Cao bồi"
                }
              }
            ],
            "ratingSet": []
          },
          "showTime": {
            "showTimeId": 1,
            "showTime": "19:00"
          },
          "showDate": "2022-09-24",
          "ticketPrice": 100000,
          "room": {
            "roomId": 1,
            "roomName": "7"
          },
          "projectionType": {
            "projectionId": 1,
            "projectionName": "3D"
          }
        },
        "user": {
          "userId": 1,
          "name": "tran van a",
          "account": {
            "username": "haha",
            "password": "123",
            "registerDate": "2022-09-09",
            "accountStatus": true,
            "point": "100",
            "verificationCode": "a",
            "isEnable": true,
            "provider": "a"
          },
          "birthday": "2022-09-09",
          "gender": 1,
          "email": "phuocrider25@gmail.com",
          "phone": "0703601484",
          "idCard": "111",
          "avatarUrl": "a",
          "ward": {
            "wardId": 1,
            "wardName": "a",
            "district": {
              "districtId": 1,
              "districtName": "a",
              "province": {
                "provinceId": 1,
                "provinceName": "a"
              }
            }
          }
        },
        "seat": {
          "seatId": 1,
          "row": {
            "rowId": 1,
            "rowName": "A"
          },
          "column": {
            "columnId": 1,
            "columnName": "1"
          },
          "seatType": {
            "seatTypeId": 1,
            "seatTypeName": "vip"
          }
        },
        "createTime": "2022-09-09",
        "ticketStatus": {
          "ticketStatusId": 1,
          "ticketStatusName": "1"
        }
      }
    ]
    window.sessionStorage.setItem("tickets", JSON.stringify(tickets));
    this.infTickets = JSON.parse(sessionStorage.getItem("tickets"));
    console.log(this.infTickets);
    this.infTickets.forEach((element)=>{
      this.price += element.movieTicket.ticketPrice;
    })
    console.log(this.price);

    // this.activeRoute.paramMap.subscribe((param: ParamMap) => {
    //   const id = param.get('id');
    //   this.detailBookTicketsService.getDetailMovie(id).subscribe(data => {
    //     console.log(data)
    //     this.infTicket = data;
    //     this.price = data.ticketPrice;
    //     console.log(this.price);
    //   });
    // });
  }

  onSubmit() {
    console.log(this.infTickets);
    this.detailBookTicketsService.payViaPaypal(this.price).subscribe(
      (data)=> {
        let movieTicketToSendMail = [];
        for(let i=0; i<this.infTickets.length; i++){
          movieTicketToSendMail.push({
            "ticketId": this.infTickets[i].ticketId,
            "email": this.infTickets[i].user.email,
            "username": this.infTickets[i].user.account.username,
            "roomName": this.infTickets[i].movieTicket.room.roomName,
            "projectionType": this.infTickets[i].movieTicket.projectionType.projectionName,
            "posterMovie": this.infTickets[i].movieTicket.movie.posterMovie,
            "movieName": this.infTickets[i].movieTicket.movie.movieName,
            "showDate": this.infTickets[i].movieTicket.showDate,
            "showTime": this.infTickets[i].movieTicket.showTime.showTime,
            "seatRow": this.infTickets[i].seat.row.rowName,
            "seatColumn": this.infTickets[i].seat.column.columnName,
            "ticketPrice": this.infTickets[i].movieTicket.ticketPrice,
          })
        }
        console.log(movieTicketToSendMail);
        this.detailBookTicketsService.sendMailSuccessful(movieTicketToSendMail).subscribe(
          ()=> console.log("Gui mail thanh cong"),
          (error)=> console.log(error)
        );
        console.log(data);
        window.location.href = data.linkName;
      },
      error => console.log(error)
    )
  }
}
