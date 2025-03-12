import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../Services/Users.service';
import { Users } from '../../../Interfaces/Users.i';
import {CardModule} from 'primeng/card'
import {RippleModule} from 'primeng/ripple'
import {ButtonModule} from 'primeng/button'
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { RendeHtmlComponent } from './rende-html/rende-html.component';
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [CardModule, RippleModule, ScrollPanelModule, TabsModule, CommonModule, RendeHtmlComponent],
  providers:[UsersService],
  
})
export default class HomeComponent implements OnInit {

  listaServicios: string [] = []
  ngOnInit() {
   this.listaServicios = [ "MEDICINA GENERAL", "OBSTETRICIA", "LABORATORIO", "CONTROL DE NIÑO", "FARMACIA", "TBC", "DENGUE", "ECOGRAFIA", "ADMISION", "CAJA"]
  this.selectTab(0);
  }
  selectedTab: number = 0; // Por defecto, seleccionamos la primera pestaña

  tabs = [
    { label: 'MEDICINA GENERAL', icon: 'pi pi-home' },
    { label: 'OBSTETRICIA', icon: 'pi pi-users' },
    { label: 'LABORATORIO', icon: 'pi pi-shopping-cart' },
    { label: 'CONTROL DE NIÑO', icon: 'pi pi-user' },
    { label: 'FARMACIA', icon: 'pi pi-cog' },
    { label: 'TBC', icon: 'pi pi-cog' },
    { label: 'DENGUE', icon: 'pi pi-cog' },
    { label: 'ECOGRAFIA', icon: 'pi pi-cog' },
    { label: 'ADMISION', icon: 'pi pi-cog' },
    { label: 'CAJA', icon: 'pi pi-cog' }

  ];
  selectedCategory: string = 'cocina'; // Categoría seleccionada por defecto
  contents: { [key: string]: string } = {
    medicina: `
     <p class="m-0 pt-2">
        Como establecimiento categoría I-3 no contamos con especialistas
        asignados. Las principales finalidades de la atención médica son:
        
      </p>
      <ul class="px-5">
        <li>Prevenir enfermedades a través de medidas sanitarias que fortalezcan el sistema
          inmune de los pacientes.
        </li>
        <li>Diagnosticar a tiempo condiciones graves de salud para que las personas reciban el
          tratamiento oportuno para recuperarse.
        </li>
        <li>Mantener y promover la salud de los pacientes a través de información médica.
        </li>
        <li>Tratar enfermedades con medicamentos de calidad y/o procedimientos
          quirúrgicos realizados por personal capacitado.
        </li>
        <li>Brindarles una mejor calidad de vida a los pacientes en estado terminal.
        </li>
      </ul>
    `,
    obstetricia: `
       <p class="m-0 pt-2">
          Las funciones obstétricas y neonatales son actividades relacionadas con la
          identificación, atención, seguimiento y cuidado del proceso de gestación, parto,
          puerperio, atención preconcepcional, prevención de cáncer de cuello uterino, atención del
          recién nacido, planificación familiar, recalcar que no contamos con especialista
          ginecoobstetra. 
        </p>
    `,
    laboratorio: `
      <p class="m-0 pt-2">
        Las actividades incluyen la recolección de las muestras, el procesamiento,
        el análisis y la presentación de informes de acuerdo a necesidad de establecimiento. Los
        procesos mas complejos y por falta de insumos y aparatos biomédicos avanzados se
        envían las muestras a otro establecimiento de mayor capacidad.
      </p>
    `,
    'control-niño': `
      <p class="m-0 pt-2">
        Los primeros años de vida de los seres humanos son muy importantes
        para potenciar su crecimiento y desarrollo. El profesional de salud en este caso las
        Licenciadas de Enfermería realiza las siguientes evaluaciones y actividades:
        
      </p>
      <ul class="px-5">
        <li>Evalúa el peso y talla de tu bebé, niño o niña.</li>
        <li>Evalúa sus habilidades psicomotoras.</li>
        <li>Vacuna al bebé, niño o niña, según el esquema vigente. </li>
        <li>Entrega suplementos de hierro (gotas o jarabe, según la edad).</li>
        <li>Brinda consejería para el cuidado adecuado del menor.</li>
        <li>Descarta enfermedades como la anemia y la parasitosis.</li>
      </ul> 
    `,
    farmacia: `
      <p class="m-0 p-5">
        Colaborar en las actividades y programas dirigidos a mejorar el uso de
        medicamentos y otros productos farmacéuticos: Entrega y selección de medicamentos y
        otros productos farmacéuticos, guías y protocolos farmacoterapéuticos y revisiones
        farmacoterapéuticas.
      </p>
    `,
    tbc: `
      <p class="m-0 pt-2">
          Contribuir en la lucha contra la tuberculosis, participando en la cobertura de la
          detección, el seguimiento del tratamiento y la calidad del cuidado en la atención de los
          pacientes. Promoción de la salud Prevención de TB (vacunas, medidas de bioseguridad y
          control de infecciones, entre otras.) Cuidado integral al paciente y familia en TB, TB-MDR,
          VIH-TB, gestante, poblaciones vulnerables. Educación sanitaria a paciente, familia y
          comunidad. Participación en elaboración de políticas
        </p>
    `,
    dengue: `
     <p class="m-0 pt-2">
        Cumplir los lineamientos de la vigilancia virológica del dengue. Garantizar la
        confirmación del 100% de casos de dengue grave (suero) y fatales (tejidos y suero) con la
        toma de muestras. Implementar el monitoreo mensual de los indicadores de la vigilancia
        del dengue (basándose en el protocolo de vigilancia)
        
      </p>
    `,
    ecografia: `
      <p class="m-0 pt-2">
        La ecografía es un procedimiento que permite obtener imágenes de muchas
        de las estructuras de nuestro organismo a través de ondas de ultra frecuencia. Previa
        orden que realiza el medico
      </p>
    `,
    admision: `
      <p class="m-0 pt-2">
        Se encarga de la custodia, revisión y disposición de las historias clínicas de los
        pacientes previamente ya registrados para sus atenciones posteriores
      </p>
    `,
    caja: `
      <p class="m-0 pt-2">
          Se encarga de la creación y documentación de las historias clínicas de pacientes
          nuevos además de recaudar fondos para abastecer de insumos y materiales que necesite
          el establecimiento para cumplir con al menos los mínimos estándares de atención.
      </p>
    `
  };
  
  selectTab(index: number) {
    console.log(index)
    this.selectedTab = index;
    const categories = ['medicina', 'obstetricia', 'laboratorio', 'control-niño', 'farmacia', 'tbc', 'dengue', 'ecografia', 'admision', 'caja'];
  
    this.selectedCategory = categories[index] || 'medicina';
  }

}
