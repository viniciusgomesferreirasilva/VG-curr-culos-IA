from pathlib import Path
import fitz
import json
ROOT = Path(__file__).parent
source = ROOT / 'assets/apresentacao-vila-parque.pdf'
original = fitz.open(source)
result = fitz.open()
gallery = ROOT / 'assets/originais'
gallery.mkdir(exist_ok=True)
audit=[]
for index, page in enumerate(original):
    # Embed the full original PDF page as vector content. Preserve every image,
    # transparency mask, logo, caption, and text block without selecting or cropping.
    target = result.new_page(width=1040, height=660)
    target.draw_rect(target.rect, color=None, fill=(.96,.95,.92))
    target.insert_text((40,32),'VILA PARQUE  /  APRESENTACAO INSTITUCIONAL',fontsize=11,color=(.15,.25,.20))
    target.show_pdf_page(fitz.Rect(40,60,1000,600), original, index, keep_proportion=True)
    target.insert_text((40,635),'Conteudo e imagens originais preservados integralmente | Vila Parque',fontsize=9,color=(.3,.36,.3))
    target.insert_text((940,635),f'{index+1:02d} / 17',fontsize=9,color=(.3,.36,.3))
    page.get_pixmap(matrix=fitz.Matrix(1.5,1.5),alpha=False).save(gallery / f'pagina-{index+1:02d}.jpg')
    audit.append({'page':index+1,'source_image_occurrences':len(page.get_image_info()),'source_text':page.get_text(),'method':'Complete original page embedded without clipping or image substitution'})
output=ROOT/'assets/vila-parque-apresentacao-remasterizada.pdf'
result.set_metadata({'title':'Vila Parque - Apresentacao com imagens originais','author':'Projeto Vila Parque','subject':'17 paginas originais integradas sem substituicao ou corte de imagens'})
result.save(output,garbage=4,deflate=True)
result.close()
check=fitz.open(output)
for index,page in enumerate(original):
    assert page.get_text().strip() in check[index].get_text()
    assert len(page.get_image_info()) == len(check[index].get_image_info())
(ROOT/'assets/verificacao-imagens.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2))
print(f'PDF validado: {len(check)} paginas; {sum(x["source_image_occurrences"] for x in audit)} ocorrencias de imagens preservadas.')
check[11].get_pixmap().save('/tmp/vila-parque-conferencia.png')
