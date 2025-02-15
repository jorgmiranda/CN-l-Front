import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAlertasComponent } from './listar-alertas.component';

describe('ListarAlertasComponent', () => {
  let component: ListarAlertasComponent;
  let fixture: ComponentFixture<ListarAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAlertasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
