
package co.edu.unicauca.distribuidos.core.capaControladores;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
@CrossOrigin(origins = "http://localhost:4200", methods = { RequestMethod.GET, RequestMethod.POST })
public class MedicoRestController {

	@Autowired
	private IMedicoService medicoService;

	@PostMapping("/medicos")
	public ResponseEntity<?> registrarMedico(@RequestBody MedicoDTOPeticion medico) {
		try {
			MedicoDTORespuesta respuesta = medicoService.registrarMedico(medico);
			return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/medicos/{idMedico}/franjas")
	public ResponseEntity<?> registrarFranja(@PathVariable Integer idMedico, @RequestBody FranjaDTOPeticion franja) {
		try {
			FranjaDTORespuesta respuesta = medicoService.registrarFranja(idMedico, franja);
			return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/medicos/{idMedico}/franjas")
	public ResponseEntity<?> obtenerFranjasPorMedicoYFecha(
			@PathVariable Integer idMedico,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
		try {
			List<FranjaDTORespuesta> respuesta = medicoService.obtenerFranjasPorMedicoYFecha(idMedico, fecha);
			return ResponseEntity.ok(respuesta);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
