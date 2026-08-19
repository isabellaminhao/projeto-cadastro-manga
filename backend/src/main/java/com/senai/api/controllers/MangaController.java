package com.senai.api.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.api.entities.Manga;
import com.senai.api.services.MangaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/mangas")
@CrossOrigin("*")
public class MangaController {

    @Autowired
    private MangaService service;

    @GetMapping
    public ResponseEntity<List<Manga>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manga> buscar(@PathVariable Long id) {

        Optional<Manga> manga = service.buscarPorId(id);

        if (manga != null) {
            return ResponseEntity.ok(manga.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Manga> criar(@Valid @RequestBody Manga manga) {

        Manga novoManga = service.salvar(manga);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoManga);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manga> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Manga manga) {

        Manga mangaAtualizado = service.atualizar(id, manga);

        if (mangaAtualizado != null) {
            return ResponseEntity.ok(mangaAtualizado);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Long id) {

        Optional<Manga> manga = service.buscarPorId(id);

        if (manga.isPresent()) {

            service.deletar(id);

            return ResponseEntity.status(HttpStatus.OK).body("Sucesso: O mangá foi excluído permanentemente!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro: Não é possível deletar. O mangá com ID "+ id + " não foi encontrado.");
    }
}