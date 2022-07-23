import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatButtonHarness} from '@angular/material/button/testing';

import { PokedexButtonComponent } from './pokedex-button.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ButtonName } from './pokedex-button.interfaces';

describe('PokedexButtonComponent', () => {
  let component: PokedexButtonComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<PokedexButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexButtonComponent ],
      imports: [
        MatIconTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexButtonComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let names: ButtonName[] = ['normal', 'shiny', 'perfect', 'threestar', 'shadow', 'purifed'];
  let values: boolean[] = [true, false];
  let disabled: boolean[] = [true, false];

  for (let name of names) {
    for (let value of values) {
      for (let disable of disabled) {
        describe(`Test button varients: name=${name} value=${value} disable=${disable}`, function () {
          const icon = value ? 'check' : 'close';
          const text = (disable ? 'unavailable' : name).toUpperCase();

          it(`Should have text: "${name}".`, async () => {
            // set up
            component.name = name;
            component.disabled = disable;
            component.value = value;
            fixture.detectChanges();

            // get button
            const firstButton = await loader.getHarness(MatButtonHarness);
            const innerText = await firstButton.getText();
            const [buttonText] = innerText.split(' ');
            expect(buttonText).toBe(text);
          })

          if (!disable) {
            it(`Should have icon "${icon}".`, async () => {
              // set up
              component.name = name;
              component.disabled = disable;
              component.value = value;
              fixture.detectChanges();

              // get button
              const firstButton = await loader.getHarness(MatButtonHarness);
              const innerText = await firstButton.getText();
              const [,buttonIcon] = innerText.split(' ');
              expect(buttonIcon).toBe(icon);
            })
          }

          if (disable) {
            it(`Should not have an icon.`, async () => {
              // set up
              component.name = name;
              component.disabled = disable;
              component.value = value;
              fixture.detectChanges();

              // get button
              const firstButton = await loader.getHarness(MatButtonHarness);
              const innerText = await firstButton.getText();
              const [,buttonIcon] = innerText.split(' ');
              expect(buttonIcon).toBeFalsy();
            })
          }

          it(`Should emit opposite (${!value}) of input value(${value}) when clicked `, async () => {
            // set up
            component.name = name;
            component.disabled = disable;
            component.value = value;
            fixture.detectChanges();

            // get button
            const firstButton = await loader.getHarness(MatButtonHarness);
            component.onClick.subscribe((output: boolean) => {
              expect(output).not.toBe(value);
            });
            await firstButton.click();
          })
        });
      }
    }
  }
});
