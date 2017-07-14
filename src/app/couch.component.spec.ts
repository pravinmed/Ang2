/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CouchComponent } from './couch.component';

describe('CouchComponent', () => {
  let component: CouchComponent;
  let fixture: ComponentFixture<CouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
