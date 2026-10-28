from pathlib import Path
import fitz,json
from PIL import Image
ROOT=Path(__file__).parent
fitz.TOOLS.mupdf_display_errors(False)
fitz.TOOLS.mupdf_display_warnings(False)
vp=fitz.open(ROOT/'assets/apresentacao-vila-parque.pdf')
book=fitz.open(ROOT/'assets/book-mall-office-original.pdf')
result=fitz.open()
cover=result.new_page(width=960,height=640)
cover.draw_rect(cover.rect,color=None,fill=(.14,.24,.19))
cover.insert_text((55,65),'VILA PARK',fontsize=18,color=(.82,.87,.62))
cover.insert_text((55,155),'Um lugar para viver.',fontname='tiro',fontsize=47,color=(.96,.95,.92))
cover.insert_text((55,215),'Um lugar para conectar.',fontname='tiro',fontsize=47,color=(.96,.95,.92))
cover.insert_text((55,265),'Bairro planejado | Centro Comercial | Office Center',fontsize=15,color=(.82,.87,.62))
cover.insert_image(fitz.Rect(55,300,590,570),filename=str(ROOT/'assets/masterplan.jpg'),keep_proportion=True)
cover.insert_text((635,350),'01 / O EMPREENDIMENTO',fontsize=11,color=(.82,.87,.62))
cover.insert_text((635,380),'Historia, territorio e projetos',fontsize=13,color=(.96,.95,.92))
cover.insert_text((635,435),'02 / MALL E OFFICE',fontsize=11,color=(.82,.87,.62))
cover.insert_text((635,465),'Localizacao, fotos e plantas',fontsize=13,color=(.96,.95,.92))
cover.insert_text((55,610),'Apresentacao unificada | Todas as paginas e imagens dos dois documentos preservadas',fontsize=10,color=(.82,.87,.62))
result.insert_pdf(vp)
result.insert_pdf(book)
result.set_toc([[1,'Apresentacao Vila Park',1],[1,'O empreendimento - Vila Parque',2],[1,'Mall e Office - Book completo',19],[2,'Localizacao',20],[2,'Ficha tecnica',21],[2,'Centro Comercial - Lojas e plantas',23],[2,'Office Center - Salas e plantas',32]])
result.set_metadata({'title':'Vila Park | Empreendimento, Mall e Office','author':'Projeto Vila Park','subject':'Apresentacao unica com os dois documentos completos e imagens originais'})
out=ROOT/'assets/vila-park-apresentacao-completa.pdf'
result.save(out,garbage=4,deflate=True)
result.close()
combined=fitz.open(out)
audit=[]
for label,source,offset in [('VP',vp,1),('BOOK',book,18)]:
 for i,page in enumerate(source):
  target=combined[i+offset]
  assert page.get_text()==target.get_text(),(label,i)
  src=sorted(im['digest'].hex() for im in page.get_image_info(hashes=True))
  dst=sorted(im['digest'].hex() for im in target.get_image_info(hashes=True))
  assert src==dst,(label,i)
  audit.append({'source':label,'source_page':i+1,'unified_page':i+offset+1,'images_verified':len(src),'text_equal':True})
(ROOT/'assets/verificacao-pdf-unico.json').write_text(json.dumps(audit,indent=2))
folder=ROOT/'assets/book';folder.mkdir(exist_ok=True)
for i,page in enumerate(book):
 pix=page.get_pixmap(matrix=fitz.Matrix(.9,.9),alpha=False)
 image=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
 image.thumbnail((1400,1000))
 image.save(folder/f'pagina-{i+1:02d}.jpg',quality=90)
for name,xref in [('mall-fachada',13),('office-fachada',145)]:
 image=book.extract_image(xref)
 (folder/f'{name}.{image["ext"]}').write_bytes(image['image'])
print(f'PDF unico validado: {len(combined)} paginas; textos e imagens originais de todas as 40 paginas conferidos.')
