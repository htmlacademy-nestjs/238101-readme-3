import { uploaderConfig } from '@project/config/config-uploader';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import { WritedFile } from './writed-file.type';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';
import { getFileNotFoundMessage } from './file.helpers';

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository
  ) {}

  private async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [year, month] = dayjs().format('YYYY MM').split(' ');

    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;
    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;

    const uuidFile = randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuidFile}.${fileExtension}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);

    const { hashName, path } = writedFile;
    const { mimetype, originalname, size } = file;

    const newFile = new FileEntity({
      hashName: hashName,
      mimetype,
      originalName: originalname,
      path: path,
      size: size,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(getFileNotFoundMessage(fileId));
    }

    return existFile;
  }
}
