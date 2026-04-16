
package co.edu.unicauca.distribuidos.core.capaControladores;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.FranjaDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.FranjaDTORespuesta;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.MedicoDTOPeticion;
import co.edu.unicauca.distribuidos.core.fachadaServices.DTO.MedicoDTORespuesta;
import co.edu.unicauca.distribuidos.core.fachadaServices.services.IMedicoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class MedicoRestController {

	@Autowired
	private IMedicoService medicoService;

	@GetMapping("/medicos")
	public List<MedicoDTORespuesta> listarMedicos() {
		return medicoService.findAll();
	}

	@GetMapping("/medicos/{id}")
	public MedicoDTORespuesta consultarMedico(@PathVariable Integer id) {
		MedicoDTORespuesta objMedico = null;
		objMedico = medicoService.findById(id);
		return objMedico;
	}

	@PostMapping("/medicos")
	public MedicoDTORespuesta crearMedico(@RequestBody MedicoDTOPeticion medico) {
		MedicoDTORespuesta objMedico = null;
		objMedico = medicoService.save(medico);
		return objMedico;
	}

	@PutMapping("/medicos/{id}")
	public MedicoDTORespuesta actualizarMedico(@RequestBody MedicoDTOPeticion medico, @PathVariable Integer id) {
		MedicoDTORespuesta objMedico = null;
		MedicoDTORespuesta medicoActual = medicoService.findById(id);
		if (medicoActual != null) {
			objMedico = medicoService.update(id, medico);
		}
		return objMedico;
	}

	@DeleteMapping("/medicos/{id}")
	public Boolean eliminarMedico(@PathVariable Integer id) {
		Boolean bandera = false;
		MedicoDTORespuesta medicoActual = medicoService.findById(id);
		if (medicoActual != null) {
			bandera = medicoService.delete(id);
		}
		return bandera;
	}

	@PostMapping("/medicos/{idMedico}/franjas")
	public FranjaDTORespuesta registrarFranja(@PathVariable Integer idMedico, @RequestBody FranjaDTOPeticion franja) {
		FranjaDTORespuesta objFranja = null;
		MedicoDTORespuesta medicoActual = medicoService.findById(idMedico);
		if (medicoActual != null) {
			objFranja = medicoService.registrarFranja(idMedico, franja);
		}
		return objFranja;
	}

	@GetMapping("/medicos/{idMedico}/franjas")
	public List<FranjaDTORespuesta> obtenerFranjasPorMedicoYFecha(
			@PathVariable Integer idMedico,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
		List<FranjaDTORespuesta> listaRetornar = List.of();
		MedicoDTORespuesta medicoActual = medicoService.findById(idMedico);
		if (medicoActual != null) {
			listaRetornar = medicoService.obtenerFranjasPorMedicoYFecha(idMedico, fecha);
		}
		return listaRetornar;
	}
}
